import { combineResolvers } from "graphql-resolvers";
import { PubSub, withFilter } from "graphql-subscriptions";
import { gql } from "graphql-tag";

import { ApolloError, isValid } from "../../helpers/grahql.js";
import Location from "../../models/location.js";
import { isAuthenticated } from "../middleware/index.js";

const pubsub = new PubSub();

const typeDefs = gql`
  type Location {
    id: ID
    name: String
    address: String
    createdBy: String
    createdAt: Date
    updatedAt: Date
    location: LocationGeo
  }

  type LocationGeo {
    locationType: String
    coordinates: [Float]
    formattedAddress: String
  }

  input LocationGeoInput {
    locationType: String
    coordinates: [Float]
    formattedAddress: String
  }

  input CreateLocationInput {
    id: ID
    name: String
    address: String!
    createdBy: String
    createdAt: Date
    updatedAt: Date
    location: LocationGeoInput
  }

  input UpdateLocationInput {
    id: ID
    name: String
    address: String
    createdBy: String
    createdAt: Date
    updatedAt: Date
    location: LocationGeoInput
  }

  input UpdateLocNameInput {
    id: ID
    name: String
  }

  extend type Query {
    location: Location
    getLocation(id: ID): Location
    locations: [Location!]
  }
  extend type Mutation {
    createLocation(createLocationInput: CreateLocationInput): Location
    updateLocation(updateLocationInput: UpdateLocationInput): Location
    updateLocationName(updateLocNameInput: UpdateLocNameInput): Location
    removeLocation(id: ID): Boolean
  }
  extend type Subscription {
    locationCreated: Location
    locationUpdated: Location
    locationDeleted: Boolean
  }
`;

const resolvers = {
  Query: {
    /* fieldName:(root, args, context, info) => { result } */
    location: combineResolvers(
      isAuthenticated,
      async (root, args, { addressId }) => {
        try {
          const location = await Location.findById(addressId);
          if (!location) {
            return ApolloError("Location not found", "LOCATION_NOT_FOUND");
          }
          return location;
        } catch (error) {
          console.log(error);
          throw error;
        }
      }
    ),
    getLocation: async (_, { id }) => {
      if (!isValid(id)) {
        return ApolloError("Provided ID is not valid", "INVALID_OBJECT_ID");
      }
      return await Location.findById(id);
    },
    locations: async () => await Location.find({}),
  },
  Mutation: {
    createLocation: async (root, { createLocationInput }) => {
      try {
        // See if an old Location exists with same name and branch
        const oldLocationByAddress = await Location.findOne({
          address: createLocationInput.address,
        });
        const oldLocationByName = await Location.findOne({
          name: createLocationInput.name,
        });
        if (oldLocationByAddress) {
          return ApolloError(
            `A Location already with address ${createLocationInput.address}`,
            "LOCATION_ALREADY_EXISTS"
          );
        } else if (oldLocationByName) {
          return ApolloError(
            `A Location already with name ${createLocationInput.name}`,
            "LOCATION_ALREADY_EXISTS"
          );
        }
        // Build mongoose model
        const newLocation = new Location({
          ...createLocationInput,
        });
        // Save the user object
        const res = await newLocation.save();
        return {
          id: res.id,
          ...res._doc,
        };
      } catch (error) {
        console.log(error);
        throw error;
      }
    },
    updateLocation: combineResolvers(
      isAuthenticated,
      async (root, { updateLocationInput }) => {
        try {
          // See if an old user exists with same email
          const oldLocation = await Location.findById(updateLocationInput.id);
          if (!oldLocation) {
            return ApolloError(
              "No Location was found with ID " + updateLocationInput.id,
              "LOCATION_NOT_FOUND"
            );
          }
          // Update old account
          const res = await Location.findOneAndUpdate(
            { _id: updateLocationInput.id },
            { updateLocationInput },
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
    updateLocationName: combineResolvers(
      isAuthenticated,
      async (root, { updateLocNameInput }) => {
        try {
          // See if an old user exists with same email
          const oldLocation = await Location.findById(updateLocNameInput.id);
          if (!oldLocation) {
            return ApolloError(
              "No Location was found with ID " + updateLocNameInput.id,
              "LOCATION_NOT_FOUND"
            );
          }
          // Update old account
          const res = await Location.findOneAndUpdate(
            { _id: updateLocNameInput.id },
            { $set: { name: updateLocNameInput.name } },
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
    removeLocation: async (id: string) =>
      await Location.findByIdAndRemove({ _id: id }),
  },
  Subscription: {
    locationCreated: {
      subscribe: withFilter(
        () => pubsub.asyncIterator("locationCreated"),
        (payload, variables) => {
          return payload.LocationCreated.location === variables.location;
        }
      ),
    },
    locationUpdated: {
      subscribe: () => pubsub.asyncIterator("locationUpdated"),
    },
    locationDeleted: {
      subscribe: () => pubsub.asyncIterator("locationDeleted"),
    },
  },
};

export { resolvers, typeDefs };
