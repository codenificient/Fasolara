import { combineResolvers } from "graphql-resolvers";
import { PubSub, withFilter } from "graphql-subscriptions";
import { gql } from "graphql-tag";

import { ApolloError, isValid } from "../../helpers/grahql.js";
import Panel from "../../models/panel.js";
import { isAuthenticated } from "../middleware/index.js";

const pubsub = new PubSub();

const typeDefs = gql`
  """
  The Panel model stores granular information about panels used for business. Panel keeps track of its own rated capacity so we can see the evolution of panel health over time and determine useful life and projected output for future panels based on empirical data. Also based on location, rain, solar irridiation, maintenance schedule, etc. Main source of business intelligence
  """
  type Panel {
    id: ID
    serialNumber: String
    installCost: Float
    installDate: Date
    orderId: ID
    groupId: ID
    isActive: Boolean
    isInstalled: Boolean
    isReplacement: Boolean
    ratedCapacity: [Capacity]
    maintenanceDates: [Maintenance]
    createdBy: ID
    createdAt: Date
    updatedAt: Date
  }

  type Maintenance {
    start: Date
    complete: Date
    comment: String
  }

  input MaintenanceInput {
    start: Date
    complete: Date
    comment: String
  }

  type Capacity {
    date: Date
    capacity: Float
  }

  input CreatePanelInput {
    id: ID
    accountId: ID
    serialNumber: String
    installCost: Float
    installDate: Date
    orderID: Date
    groupId: ID
    isActive: Boolean
    isInstalled: Boolean
    isReplacement: Boolean
    maintenanceDate: Date
    createdBy: ID
    updatedAt: Date
  }

  input AddCapacityInput {
    date: Date
    capacity: Float
  }

  input UpdatePanelInput {
    accountId: ID
    serialNumber: String
    installCost: Float
    installDate: Date
    orderID: Date
    groupId: ID
    isActive: Boolean
    isInstalled: Boolean
    isReplacement: Boolean
    maintenanceDates: MaintenanceInput
    createdBy: ID
    updatedAt: Date
  }

  extend type Query {
    myPanels: Panel
    getPanel(id: ID): Panel
    panels: [Panel!]
  }

  extend type Mutation {
    createPanel(createPanelInput: CreatePanelInput): Panel
    updatePanel(updatePanelInput: UpdatePanelInput): Panel
    updatePanelCapacity(addCapacityInput: AddCapacityInput): Panel
  }
  extend type Subscription {
    panelCreated: Panel
    panelUpdated: Panel
    panelDeleted: Boolean
  }
`;

const resolvers = {
  Query: {
    myPanels: combineResolvers(
      isAuthenticated,
      async (_, __,  { groupId } ) => {
        try {
          return await Panel.find({ groupId });
        } catch (error) {
          console.log(error);
          throw error;
        }
      }
    ),
    getPanel: async (_, { id }) => {
      if (!isValid(id)) {
        return ApolloError("Provided ID is not valid", "INVALID_ID");
      }
      return await Panel.findById(id);
    },
    panels: async () => await Panel.find({}),
  },
  Mutation: {
    createPanel: async (_, { createPanelInput }) => {
      try {
        // See if an old comment exists with same serial number
        const oldPanel = await Panel.findOne({
          serialNumber: createPanelInput.serialNumber,
        });
        if (oldPanel) {
          return ApolloError(
            `A Panel already exists with serial ${createPanelInput.serialNumber}`,
            "PANEL_EXISTS"
          );
        }
        // Build mongoose model
        const newPanel = new Panel({
          ...createPanelInput,
        });
        // Save the user object
        const res = await newPanel.save();
        return {
          id: res.id,
          ...res._doc,
        };
      } catch (error) {
        console.log(error);
        throw error;
      }
    },
    updatePanel: combineResolvers(
      isAuthenticated,
      async (_, { updatePanelInput }) => {
        try {
          // See if an old user exists with same email
          const oldPanel = await Panel.findById(updatePanelInput.id);
          if (!oldPanel) {
            return ApolloError(
              "No Panel was found with ID " + updatePanelInput.id,
              "PANEL_NOT_FOUND"
            );
          }
          // Update old account
          const res = await Panel.findOneAndUpdate(
            { id: updatePanelInput.id },
            { updatePanelInput },
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
    panelCreated: {
      subscribe: withFilter(
        () => pubsub.asyncIterator("bankCreated"),
        (payload, variables) => {
          return payload.bankCreated.location === variables.location;
        }
      ),
    },
    panelUpdated: {
      subscribe: () => pubsub.asyncIterator("panelUpdated"),
    },
    panelDeleted: {
      subscribe: () => pubsub.asyncIterator("panelDeleted"),
    },
  },
};

export { resolvers, typeDefs };
