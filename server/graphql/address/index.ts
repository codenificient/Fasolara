import { combineResolvers } from "graphql-resolvers";
import { PubSub } from "graphql-subscriptions";
import { gql } from "graphql-tag";
import { ApolloError } from "../../helpers/grahql.js";

import Address from "../../models/address.js";
import Village from "../../models/village.js";
import { isAdmin, isAuthenticated } from "../middleware/index.js";

const pubsub = new PubSub();

const typeDefs = gql`
  type Address {
    id: ID
    name: String
    mobileNumber: String
    locationId: ID
    # location: Location
    villageId: ID
    village: Village
    address: String
    addressType: String
    dotcolor: String
    createdAt: Date
    updatedAt: Date
  }

  input CreateAddressInput {
    id: ID
    name: String
    mobileNumber: String
    locationId: ID
    villageId: ID
    address: String
    addressType: String
    dotcolor: String
    updatedAt: Date
  }

  input UpdateAddressInput {
    id: ID!
    name: String
    mobileNumber: String
    locationId: ID
    villageId: ID
    address: String
    addressType: String
    dotcolor: String
    updatedAt: Date
  }

  extend type Query {
    address: Address
    getAddress(id: ID): Address
    addresses: [Address!]
  }

  extend type Mutation {
    createAddress(createAddressInput: CreateAddressInput): Address
    updateAddress(updateAddressInput: UpdateAddressInput): Address
    removeAddress(id: ID): Boolean
  }

  extend type Subscription {
    addressCreated: Address
    addressUpdated: Address
    addressDeleted: Boolean
  }
`;

const resolvers = {
  Query: {
    addresses: async () => await Address.find(),
    getAddress: async (_, { id }) => await Address.findById(id),
    address: combineResolvers(isAuthenticated, async (_, __, { user }) => {
      try {
        const address = await Address.findOne({ customerId: user.id });
        if (!address) {
          return ApolloError("Address not found", "ADDRESS_NOT_FOUND");
        }
        return address;
      } catch (error) {
        console.log(error);
        throw error;
      }
    }),
  },
  Mutation: {
    createAddress: combineResolvers(
      isAdmin,
      async (_, { createAddressInput }) => {
        try {
          // See if an old user exists with same email
          const oldAddress = await Address.findOne({
            address: createAddressInput.address,
          });
          if (oldAddress) {
            return ApolloError(
              "An address already exists with address" +
                createAddressInput.address,
              "ADDRESS_ALREADY_EXISTS"
            );
          }
          // Build mongoose model
          const newAddress = new Address({
            ...createAddressInput,
          });
          // Save the user object
          const res = await newAddress.save();
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
    updateAddress: combineResolvers(
      isAdmin,
      async (_, { updateAddressInput }) => {
        try {
          // See if an old user exists with same email
          const oldAddress = await Address.findById(updateAddressInput.id);
          if (!oldAddress) {
            return ApolloError(
              "No account was found with ID  " + updateAddressInput.id,
              "ADDRESS_NOT_FOUND"
            );
          }
          // Update old address
          // update address using provided
          const newAddress = new Address();
          if (updateAddressInput.name)
            newAddress.name = updateAddressInput.name;
          if (updateAddressInput.mobileNumber)
            newAddress.mobileNumber = updateAddressInput.mobileNumber;
          if (updateAddressInput.locationId)
            newAddress.locationId = updateAddressInput.locationId;
          if (updateAddressInput.villageId)
            newAddress.villageId = updateAddressInput.villageId;
          if (updateAddressInput.address)
            newAddress.address = updateAddressInput.address;
          if (updateAddressInput.addressType)
            newAddress.addressType = updateAddressInput.addressType;
          if (updateAddressInput.dotcolor)
            newAddress.dotcolor = updateAddressInput.dotcolor;
          if (updateAddressInput.updatedAt)
            newAddress.updatedAt = updateAddressInput.updatedAt;
          const res = await Address.findOneAndUpdate(
            { _id: updateAddressInput.id },
            { newAddress },
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
    removeAddress: async (_, { id }) => await Address.findByIdAndRemove(id),
  },
  Subscription: {
    addressCreated: {
      subscribe: () => pubsub.asyncIterator("addressCreated"),
    },
    addressUpdated: {
      subscribe: () => pubsub.asyncIterator("addressUpdated"),
    },
    addressDeleted: {
      subscribe: () => pubsub.asyncIterator("addressDeleted"),
    },
  },
  Address: {
    village: (parent, args, contextValue, info) => {
      return Village.findById(parent.villageId);
    },
    location: async (parent) => {},
  },
};

export { typeDefs, resolvers };
