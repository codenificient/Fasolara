import { combineResolvers } from "graphql-resolvers";
import { PubSub } from "graphql-subscriptions";
import { gql } from "graphql-tag";
import { ApolloError } from "../../helpers/grahql.js";

import Account from "../../models/account.js";
import Bank from "../../models/bank.js";
import User from "../../models/user.js";
import { isAdmin, isAuthenticated } from "../middleware/index.js";

const pubsub = new PubSub();

const typeDefs = gql`
  type Account {
    id: ID
    balance: Float
    debtAmount: Float
    lifetimeEarning: Float
    accountNumber: String
    solarGroup: ID
    carrier: String
    customer: User
    customerId: ID
    loaningBank: Bank
    loaningBankId: ID
    createdAt: Date
    updatedAt: Date
  }

  input CreateAccountInput {
    id: ID
    balance: Float
    debtAmount: Float
    lifetimeEarning: Float
    accountNumber: String
    solarGroup: ID
    carrier: String
    customerId: ID!
    loaningBankId: ID!
  }

  input UpdateAccountInput {
    id: ID!
    balance: Float
    debtAmount: Float
    lifetimeEarning: Float
    accountNumber: String
    solarGroup: ID
    carrier: String
    customerId: ID
    loaningBankId: ID
    updatedAt: Date
  }

  extend type Query {
    accounts: [Account]
    getAccount(id: ID!): Account
    account: Account
  }

  extend type Mutation {
    createAccount(input: CreateAccountInput!): Account
    updateAccount(id: ID!, input: UpdateAccountInput!): Account
    removeAccount(id: ID!): Boolean
  }

  extend type Subscription {
    accountCreated: Account
    accountUpdated: Account
    accountDeleted: Boolean
  }
`;

const resolvers = {
  Query: {
    accounts: async () => await Account.find(),
    getAccount: async (_, { id }) => await Account.findById(id),
    account: combineResolvers(isAdmin, async (_, __, { user }) => {
      try {
        const account = await Account.findOne({ customerId: user.id });
        if (!account) {
          return ApolloError("Account not found", "ACCOUNT_NOT_FOUND");
        }
        return account;
      } catch (error) {
        console.log(error);
        throw error;
      }
    }),
  },
  Mutation: {
    createAccount: combineResolvers(
      isAdmin,
      async (_, { createAccountInput }) => {
        try {
          // See if an old account exists with same userId
          const oldAccountByUser = await Account.findOne({
            id: createAccountInput.customerId,
          });
          // See if an old account exists with same accountNumber
          const oldAccountByAccount = await Account.findOne({
            accountNumber: createAccountInput.accountNumber,
          });

          if (oldAccountByUser) {
            return ApolloError(
              "An account already exists for user  " +
                createAccountInput.customerId,
              "ACCOUNT_ALREADY_EXISTS"
            );
          } else if (oldAccountByAccount) {
            return ApolloError(
              "An account already exists for accountNumber  " +
                createAccountInput.accountNumber,
              "ACCOUNT_ALREADY_EXISTS"
            );
          }

          // Build mongoose model
          const newAccount = new Account({
            ...createAccountInput,
          });

          // Save the user object
          const res = await newAccount.save();

          return {
            id: res.id,
            ...res._doc,
          };
        } catch (error) {
          console.log(error);
          throw error;
        }
      }
    ),
    updateAccount: combineResolvers(
      isAdmin,
      async (_, { updateAccountInput }) => {
        try {
          // See if an old user exists with same email
          const oldAccount = await Account.findById(updateAccountInput.id);

          if (!oldAccount) {
            return ApolloError(
              "No account was found with ID " + updateAccountInput.id,
              "ACCOUNT_NOT_FOUND"
            );
          }

          // Update old account
          const res = await Account.findOneAndUpdate(
            { id: updateAccountInput.id },
            { updateAccountInput },
            { new: true }
          );

          return {
            id: res.id,
            ...res._doc,
          };
        } catch (error) {
          console.log(error);
          throw error;
        }
      }
    ),
    removeAccount: async (_, { id }) => await Account.findByIdAndRemove(id),
  },
  Subscription: {
    accountCreated: {
      subscribe: () => pubsub.asyncIterator("accountCreated"),
    },
    accountUpdated: {
      subscribe: () => pubsub.asyncIterator("accountUpdated"),
    },
    accountDeleted: {
      subscribe: () => pubsub.asyncIterator("accountDeleted"),
    },
  },
  Account: {
    customer: async (parent) => {
      return await User.findById(parent.customerId);
    },
    loaningBank: async (parent) => {
      return await Bank.findById(parent.loaningBankId);
    },
  },
};

export { typeDefs, resolvers };
