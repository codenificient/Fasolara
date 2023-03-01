import { combineResolvers } from "graphql-resolvers";
import { PubSub, withFilter } from "graphql-subscriptions";
import { gql } from "graphql-tag";

import { ApolloError, isValid } from "../../helpers/grahql.js";
import Supplier from "../../models/supplier.js";
import { isAuthenticated } from "../middleware/index.js";

const pubsub = new PubSub();

const typeDefs = gql`
  """
  The Supplier model stores contact information about any business that provides goods and services to our business
  """
  type Supplier {
    id: ID
    name: String
    accountId: ID
    addressId: ID
    isActive: Boolean
    area: String
    createdAt: Date
    updatedAt: Date
  }

  input CreateSupplierInput {
    id: ID
    name: String
    accountId: ID
    addressId: ID
    isActive: Boolean
    area: String
    updatedAt: Date
  }

  input UpdateSupplierInput {
    name: String
    accountId: ID
    addressId: ID
    isActive: Boolean
    area: String
    updatedAt: Date
  }

  extend type Query {
    supplier(id: ID): Supplier
    suppliers: [Supplier!]
  }

  extend type Mutation {
    createSupplier(createSupplierInput: CreateSupplierInput): Supplier
    updateSupplier(updateSupplierInput: UpdateSupplierInput): Supplier
  }
  extend type Subscription {
    supplierCreated: Supplier
    supplierUpdated: Supplier
    supplierDeleted: Boolean
  }
`;

const resolvers = {
  Query: {
    /* fieldName:(root, args, context, info) => { result } */
    supplier: async (_, { id }) => {
      if (!isValid(id)) {
        return ApolloError("Provided ID is not valid", "INVALID_OBJECT_ID");
      }
      return await Supplier.findById(id);
    },
    suppliers: async () => await Supplier.find({}),
  },
  Mutation: {
    createSupplier: async (_, { createSupplierInput }) => {
      try {
        // See if an old comment exists with same accountId
        const oldSupplier = await Supplier.findOne({
          accountId: createSupplierInput.accountId,
        });

        if (oldSupplier) {
          return ApolloError(
            `A Supplier already exists with ID ${createSupplierInput.accountId}`,
            "SUPPLIER_ALREADY_EXISTS"
          );
        }
        // Build mongoose model
        const newSupplier = new Supplier({
          ...createSupplierInput,
        });

        // Save the user object
        const res = await newSupplier.save();

        return {
          id: res.id,
          ...res._doc,
        };
      } catch (error) {
        console.log(error);
        throw error;
      }
    },
    updateSupplier: combineResolvers(
      isAuthenticated,
      async (_, { updateSupplierInput }) => {
        try {
          // See if an old user exists with same email
          const oldSupplier = await Supplier.findById(updateSupplierInput.id);

          if (!oldSupplier) {
            return ApolloError(
              "No Supplier was found with ID " + updateSupplierInput.id,
              "SUPPLIER_NOT_FOUND"
            );
          }

          // Update old account
          const res = await Supplier.findOneAndUpdate(
            { _id: updateSupplierInput.id },
            { updateSupplierInput },
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
    supplierCreated: {
      subscribe: withFilter(
        () => pubsub.asyncIterator("supplierCreated"),
        (payload, variables) => {
          return payload.supplierCreated.location === variables.location;
        }
      ),
    },
    supplierUpdated: {
      subscribe: () => pubsub.asyncIterator("supplierUpdated"),
    },
    supplierDeleted: {
      subscribe: () => pubsub.asyncIterator("supplierDeleted"),
    },
  },
};

export { resolvers, typeDefs };
