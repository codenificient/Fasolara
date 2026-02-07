import { combineResolvers } from "graphql-resolvers";
import { PubSub, withFilter } from "graphql-subscriptions";
import { gql } from "graphql-tag";

import { ApolloError, isValid } from "../../helpers/grahql.js";
import Agenda from "../../models/agenda.js";
import { isAdmin, isAuthenticated } from "../middleware/index.js";

const pubsub = new PubSub();

const typeDefs = gql`
  type Agenda {
    id: ID
    name: String
    agendaType: String
    location: String
    startTime: Date
    endTime: Date
    avatarIcon: String
    createdBy: ID
    createdAt: Date
    updatedAt: Date
  }

  input CreateAgendaInput {
    id: ID
    name: String
    agendaType: String
    location: String
    startTime: Date
    endTime: Date
    avatarIcon: String
    createdBy: ID
    createdAt: Date
    updatedAt: Date
  }

  input UpdateAgendaInput {
    id: ID
    name: String
    agendaType: String
    location: String
    startTime: Date
    endTime: Date
    avatarIcon: String
    createdBy: ID
    createdAt: Date
    updatedAt: Date
  }

  extend type Query {
    agenda: [Agenda]
    getAgenda(id: ID): Agenda
    agendas: [Agenda!]
  }
  extend type Mutation {
    createAgenda(createAgendaInput: CreateAgendaInput): Agenda
    updateAgenda(updateAgendaInput: UpdateAgendaInput): Agenda
    removeAgenda(id: ID): Boolean
  }
  extend type Subscription {
    agendaCreated: Agenda
    agendaUpdated: Agenda
    agendaDeleted: Boolean
  }
`;

const resolvers = {
  Query: {
    /* fieldName:(root, args, context, info) => { result } */
    agenda: combineResolvers(isAuthenticated, async (_, __, { user }) => {
      try {
        const agendas = await Agenda.find({ createdBy: user.id });
        if (!agendas.length) {
          return ApolloError("Agenda not found", "AGENDA_NOT_FOUND");
        }
        return agendas;
      } catch (error) {
        console.log(error);
        throw error;
      }
    }),
    getAgenda: async (_, { id }) => {
      if (!isValid(id)) {
        return ApolloError("Provided ID is not valid", "INVALID_OBJECT_ID");
      }
      return await Agenda.findById(id);
    },
    agendas: async () => await Agenda.find({}),
  },
  Mutation: {
    createAgenda: combineResolvers(
      isAdmin,
      async (_, { createAgendaInput }) => {
        try {
          // See if an old Agenda exists with same name and branch
          const oldAgendaByTime = await Agenda.findOne({
            startTime: createAgendaInput.startTime,
            endTime: createAgendaInput.endTime,
          });
          if (oldAgendaByTime) {
            return ApolloError(
              `An Agenda already exists with starting ${createAgendaInput.startTime} and ending ${createAgendaInput.endTime}`,
              "AGENDA_ALREADY_EXISTS"
            );
          }
          // Build mongoose model
          const newAgenda = new Agenda({
            ...createAgendaInput,
          });
          // Save the user object
          const res = await newAgenda.save();
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
    updateAgenda: combineResolvers(
      isAdmin,
      async (_, { updateAgendaInput }) => {
        try {
          // See if an old user exists with same email
          const oldAgenda = await Agenda.findById(updateAgendaInput.id);
          if (!oldAgenda) {
            return ApolloError(
              "No Agenda was found with ID " + updateAgendaInput.id,
              "AGENDA_NOT_FOUND"
            );
          }
          // Update old account
          const res = await Agenda.findOneAndUpdate(
            { _id: updateAgendaInput.id },
            { updateAgendaInput },
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
    removeAgenda: combineResolvers(
      isAdmin,
      async (id: string) => await Agenda.findByIdAndDelete({ _id: id })
    ),
  },
  Subscription: {
    agendaCreated: {
      subscribe: withFilter(
        () => pubsub.asyncIterator("agendaCreated"),
        (payload, variables) => {
          return payload.agendaCreated.location === variables.location;
        }
      ),
    },
    agendaUpdated: {
      subscribe: () => pubsub.asyncIterator("agendaUpdated"),
    },
    agendaDeleted: {
      subscribe: () => pubsub.asyncIterator("agendaDeleted"),
    },
  },
};

export { resolvers, typeDefs };
