import { combineResolvers } from "graphql-resolvers"
import { PubSub, withFilter } from "graphql-subscriptions"
import { gql } from "graphql-tag"

import { ApolloError, isValid } from "../../helpers/grahql.js"
import Transaction from "../../models/transaction.js"
import { isAuthenticated } from "../middleware/index.js"

const pubsub = new PubSub();

const typeDefs = gql`
  """
  The Transaction model stores every monetary transaction, any money moving in and out of the business. Enables data science
  """
  type Transaction {
    id: ID
    senderId: ID
    receiverId: ID
    srcAccountId: ID
    destAccountId: ID
    amount: Float
    tax: Float
    taxRate: Float
    currency: String
    memo: String
    status: String
    kind: String
    createdAt: Date
    updatedAt: Date
  }

  input CreateTransactionInput {
    id: ID
    senderId: ID
    receiverId: ID
    srcAccountId: ID
    destAccountId: ID
    amount: Float
    tax: Float
    taxRate: Float
    currency: String
    memo: String
    status: String
    kind: String
    updatedAt: Date
  }

  input UpdateTransactionInput {
    id: ID
    senderId: ID
    receiverId: ID
    srcAccountId: ID
    destAccountId: ID
    amount: Float
    tax: Float
    taxRate: Float
    currency: String
    memo: String
    status: String
    kind: String
    updatedAt: Date
  }

  extend type Query {
    pastTransactions: [Transaction]
    getTransaction(id: ID): Transaction
    transactions: [Transaction!]
  }

  extend type Mutation {
    createTransaction(
      createTransactionInput: CreateTransactionInput
    ): Transaction
    updateTransaction(
      updateTransactionInput: UpdateTransactionInput
    ): Transaction
  }
  extend type Subscription {
    transactionCreated: Transaction
    transactionUpdated: Transaction
    transactionDeleted: Boolean
  }
`;

const resolvers = {
  Query: {
    /* fieldName:(root, args, context, info) => { result } */
    pastTransactions: combineResolvers(
      isAuthenticated,
      async (_, __, {user} ) => {
        try {
          const inTransactions = await Transaction.find({receiverId: user.id});
          const outTransactions = await Transaction.find({ senderId: user.id });
          return [...inTransactions, ...outTransactions];
        } catch (error) {
          console.log(error);
          throw error;
        }
      }
    ),
    getTransaction: async (_, { id }) => {
      if (!isValid(id)) {
        return ApolloError("Provided ID is not valid", "INVALID_OBJECT_ID");
      }
      return await Transaction.findById(id);
    },
    transactions: async () => await Transaction.find({}),
  },
  Mutation: {
    createTransaction: async (_, { createTransactionInput }) => {
      try {
        // See if an old comment exists with same user and message
        const oldTransaction = await Transaction.findOne({
          customerId: createTransactionInput.customerId,
          accountId: createTransactionInput.accountId,
          createdAt: createTransactionInput.createdAt,
        });

        if (oldTransaction) {
          return ApolloError(
            `A Transaction already exists with ID ${oldTransaction.id}`,
            "TRANSACTION_ALREADY_EXISTS"
          );
        }
        // Build mongoose model
        const newTransaction = new Transaction({
          ...createTransactionInput,
        });

        // Save the user object
        const res = await newTransaction.save();

        return {
          id: res.id,
          ...res._doc,
        };
      } catch (error) {
        console.log(error);
        throw error;
      }
    },
    updateTransaction: combineResolvers(
      isAuthenticated,
      async (_, { updateTransactionInput }) => {
        try {
          // See if an old user exists with same email
          const oldTransaction = await Transaction.findById(
            updateTransactionInput.id
          );

          if (!oldTransaction) {
            return ApolloError(
              "No Transaction was found with ID " + updateTransactionInput.id,
              "TRANSACTION_NOT_FOUND"
            );
          }

          // Update old account
          const res = await Transaction.findOneAndUpdate(
            { _id: updateTransactionInput.id },
            { updateTransactionInput },
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
  },
  Subscription: {
    transactionCreated: {
      subscribe: withFilter(
        () => pubsub.asyncIterator("transactionCreated"),
        (payload, variables) => {
          return payload.transactionCreated.location === variables.location;
        }
      ),
    },
    transactionUpdated: {
      subscribe: () => pubsub.asyncIterator("transactionUpdated"),
    },
    transactionDeleted: {
      subscribe: () => pubsub.asyncIterator("transactionDeleted"),
    },
  },
};

export { resolvers, typeDefs }

