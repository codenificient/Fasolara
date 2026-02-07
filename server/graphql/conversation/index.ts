import { combineResolvers } from "graphql-resolvers";
import { PubSub, withFilter } from "graphql-subscriptions";
import { gql } from "graphql-tag";
import { Types } from "mongoose";

import { ApolloError, isValid } from "../../helpers/grahql.js";
import Conversation from "../../models/conversation.js";
import { isAuthenticated } from "../middleware/index.js";

const { ObjectId } = Types;

const pubsub = new PubSub();

const typeDefs = gql`
  type Message {
    _id: ID!
    senderId: ID
    date: Date!
    content: String
    status: String
  }

  type Participant {
    userId: ID
    connect: String
    avatar: String
    name: String
    phone: String
  }

  type Conversation {
    _id: ID!
    participants: [Participant]
    status: String
    messages: [Message]
    createdBy: ID
    createdAt: Date
    updatedAt: Date
    _doc: String
  }

  input ParticipantInput {
    userId: ID!
    connect: String
    avatar: String
    name: String
    phone: String
  }

  input MessageInput {
    senderId: ID!
    date: Date
    content: String!
    status: String
  }

  input AddMsgInput {
    id: ID!
    message: MessageInput
  }

  input AddPptInput {
    id: ID!
    participant: ParticipantInput
    participants: [ParticipantInput!]
  }

  input CreateConvoInput {
    id: ID
    participants: [ID!]!
    status: String
    message: MessageInput!
  }

  input UpdateConvoInput {
    id: ID!
    participants: [ID!]
    status: String
    messages: MessageInput!
  }

  extend type Query {
    conversations: [Conversation]
    getConversation(id: ID): Conversation
    conversation: Conversation
  }

  extend type Subscription {
    conversationChanged: Conversation
  }

  extend type Mutation {
    createConversation(createConvoInput: CreateConvoInput): Conversation
    updateConversation(updateConvoInput: UpdateConvoInput): Conversation
    updateConvoMsg(addMsgInput: AddMsgInput): Conversation
    updateConvoPpt(addPptInput: AddPptInput): Conversation
    removeConversation(id: ID!): Conversation
  }
`;

const resolvers = {
  Mutation: {
    createConversation: combineResolvers(
      isAuthenticated,
      async (_, { createConvoInput }) => {
        try {
          // See if an old Conversation exists with same participants
          const oldConvo = await Conversation.find({
            "participants.userId": {
              $all: createConvoInput.participants,
            },
          });
          // const oldConvo = await Conversation.find({})
          //   .where("participants")
          //   .all(createConvoInput.participants);
          if (oldConvo) {
            return await Conversation.findByIdAndUpdate(
              {
                _id: oldConvo[0]._id,
              },
              {
                $addToSet: {
                  messages: createConvoInput.message,
                },
              },
              { new: true }
            );
          }
          // Build mongoose model
          let parts = [],
            part = {
              userId: "",
              connect: "",
              avatar: "",
              name: "",
              phone: "",
            },
            mess = {};
          for (let participant of createConvoInput.participants) {
            part.userId = new ObjectId(participant).toString();
            parts.push(part);
          }
          mess = createConvoInput.messages;
          //   mess.date = new Date();
          const newConversation = new Conversation({
            participants: [...parts],
            messages: [mess],
          });
          // Save the user object
          const res = await newConversation.save();
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
    updateConversation: combineResolvers(
      isAuthenticated,
      async (_, { updateConvoInput }) => {
        try {
          // See if an old user exists with same email
          const oldConversation = await Conversation.findById(
            updateConvoInput.id
          );
          if (!oldConversation) {
            return ApolloError(
              "No Conversation was found with ID " + updateConvoInput.id,
              "Conversation_NOT_FOUND"
            );
          }
          // Update old account
          const res = await Conversation.findOneAndUpdate(
            { _id: updateConvoInput.id },
            { updateConvoInput },
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
    updateConvoMsg: combineResolvers(
      isAuthenticated,
      async (_, { addMsgInput }) => {
        try {
          // See if an old user exists with same email
          const oldConversation = await Conversation.findById(addMsgInput.id);
          if (!oldConversation) {
            return ApolloError(
              "No Conversation was found with ID " + addMsgInput.id,
              "Conversation_NOT_FOUND"
            );
          }
          // Update old account
          const res = await Conversation.findByIdAndUpdate(
            { _id: addMsgInput.id },
            {
              $addToSet: {
                messages: addMsgInput.message,
              },
            },
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
    updateConvoPpt: combineResolvers(
      isAuthenticated,
      async (_, { addPptInput }) => {
        try {
          // See if an old user exists with same email
          const oldConversation = await Conversation.findById(addPptInput.id);
          if (!oldConversation) {
            return ApolloError(
              "No Conversation was found with ID " + addPptInput.id,
              "Conversation_NOT_FOUND"
            );
          }
          // Update old account
          const res = await Conversation.findByIdAndUpdate(
            { _id: addPptInput.id },
            {
              $addToSet: {
                participants: addPptInput.participant,
              },
            },
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
    removeConversation: async (id: string) =>
      await Conversation.findByIdAndDelete(id),
  },
  Query: {
    /* fieldName:(root, args, context, info) => { result } */
    conversation: combineResolvers(
      isAuthenticated,
      async (_, __, { user } ) => {
        try {
          const conversation = await Conversation.findOne({
            participants: { userId: user.id },
          }).populate({
            path: "participants.userId",
            model: "User",
          });
          if (!conversation) {
            return ApolloError("Account not found", "ACCOUNT_NOT_FOUND");
          }
          return conversation;
        } catch (error) {
          console.log(error);
          throw error;
        }
      }
    ),
    getConversation: async (_, { id }) => {
      if (!isValid(id)) {
        return ApolloError("Provided ID is not valid", "INVALID_OBJECT_ID");
      }
      return await Conversation.findById(id).populate({
        path: "participants.userId",
        model: "User",
      });
    },
    conversations: async () =>
      await Conversation.find({}).populate({
        path: "participants",
        model: "User",
      }),
  },
  Subscription: {
    conversationChanged: {
      subscribe: withFilter(
        () => pubsub.asyncIterator("bankCreated"),
        (payload, variables) => {
          return payload.conversationChanged.id === variables.conversationId;
        }
      ),
    },
  },
};

export { typeDefs, resolvers };
