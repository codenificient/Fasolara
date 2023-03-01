import { combineResolvers } from "graphql-resolvers";
import { PubSub, withFilter } from "graphql-subscriptions";
import { gql } from "graphql-tag";

import { ApolloError, isValid } from "../../helpers/grahql.js";
import Investor from "../../models/investor.js";
import { isAuthenticated } from "../middleware/index.js";

const pubsub = new PubSub();

const typeDefs = gql`
  """
  The Investor model inherits from base User model and adds investment startDate as well as referrals and bonuses
  """
  type Investor {
    id: ID
    role: String
    userId: ID
    accountId: ID
    bonuses: [ID]
    referrals: [ID]
    startDate: Date
    endDate: Date
    createdAt: Date
    updatedAt: Date
  }

  input CreateInvestorInput {
    id: ID
    startDate: Date
    endDate: Date
    userId: ID
    accountId: ID
    teamId: ID
    bonuses: [ID]
    referrals: [ID]
    updatedAt: Date
  }

  input UpdateInvestorInput {
    id: ID
    startDate: Date
    endDate: Date
    userId: ID
    accountId: ID
    teamId: ID
    role: String
    bonuses: [ID]
    referrals: [ID]
    updatedAt: Date
  }

  extend type Query {
    investor: Investor
    getInvestor(id: ID): Investor
    investors: [Investor!]
  }

  extend type Mutation {
    createInvestor(createInvestorInput: CreateInvestorInput): Investor
    updateInvestor(updateInvestorInput: UpdateInvestorInput): Investor
    removeInvestor(id: ID!): Boolean
  }
  extend type Subscription {
    investorCreated: Investor
    investorUpdated: Investor
    investorDeleted: Boolean
  }
`;

const resolvers = {
  Query: {
    /* fieldName:(root, args, context, info) => { result } */
    investor: combineResolvers(
      isAuthenticated,
      async (_, __, { user } ) => {
        try {
          const investor = await Investor.findOne({ userId: user.id });
          if (!investor) {
            return ApolloError("Investor not found", "INVESTOR_NOT_FOUND");
          }
          return investor;
        } catch (error) {
          console.log(error);
          throw error;
        }
      }
    ),
    getInvestor: async (_, { id }) => {
      if (!isValid(id)) {
        return ApolloError("Provided ID is not valid", "INVALID_OBJECT_ID");
      }
      return await Investor.findById(id);
    },
    investors: async () => await Investor.find({}),
  },
  Mutation: {
    createInvestor: async (_, { createInvestorInput }) => {
      try {
        // See if an old Investor exists with same name and branch
        const oldInvestorByBranch = await Investor.findOne({
          name: createInvestorInput.name,
          branch: createInvestorInput.branch,
        });
        if (oldInvestorByBranch) {
          return ApolloError(
            `An Investor already with name ${createInvestorInput.name} and branch ${createInvestorInput.branch}`,
            "Investor_ALREADY_EXISTS"
          );
        }
        // Build mongoose model
        const newInvestor = new Investor({
          ...createInvestorInput,
        });
        // Save the user object
        const res = await newInvestor.save();
        return {
          id: res.id,
          ...res._doc,
        };
      } catch (error) {
        console.log(error);
        throw error;
      }
    },
    updateInvestor: combineResolvers(
      isAuthenticated,
      async (_, { updateInvestorInput }) => {
        try {
          // See if an old user exists with same email
          const oldInvestor = await Investor.findById(updateInvestorInput.id);
          if (!oldInvestor) {
            return ApolloError(
              "No Investor was found with ID " + updateInvestorInput.id,
              "ACCOUNT_NOT_FOUND"
            );
          }
          // Update old account
          const res = await Investor.findOneAndUpdate(
            { _id: updateInvestorInput.id },
            { updateInvestorInput },
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
    removeInvestor: async (id: string) =>
      await Investor.findByIdAndRemove({ _id: id }),
  },
  Subscription: {
    investorCreated: {
      subscribe: withFilter(
        () => pubsub.asyncIterator("investorCreated"),
        (payload, variables) => {
          return payload.investorCreated.location === variables.location;
        }
      ),
    },
    investorUpdated: {
      subscribe: () => pubsub.asyncIterator("investorUpdated"),
    },
    investorDeleted: {
      subscribe: () => pubsub.asyncIterator("investorDeleted"),
    },
  },
};

export { resolvers, typeDefs };
