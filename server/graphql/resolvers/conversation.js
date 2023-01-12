const { ApolloError } = require("apollo-server-errors");
const Conversation = require("../../models/conversation");
const { combineResolvers } = require("graphql-resolvers");
const { isAuthenticated } = require("./middleware");
const { isValid } = require("../../helpers/validateId");
const {
  Types: { ObjectId },
} = require("mongoose");

module.exports = {
  Mutation: {
    createConversation: combineResolvers(
      isAuthenticated,
      async (_, { createConvoInput }) => {
        try {
          // See if an old Conversation exists with same participants
          const oldConversationByParticipants = await Conversation.find({
            "participants.userId": {
              $all: createConvoInput.participants,
            },
          });
          // const oldConversationByParticipants = await Conversation.find({})
          //   .where("participants")
          //   .all(createConvoInput.participants);

          if (oldConversationByParticipants) {
            return await Conversation.findByIdAndUpdate(
              {
                _id: oldConversationByParticipants._id,
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
            part = {},
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
            throw new ApolloError(
              "No Conversation was found with ID " + updateConvoInput.id,
              "Conversation_NOT_FOUND"
            );
          }

          // Update old account
          const res = await Conversation.findOneAndUpdate(
            { id: updateConvoInput.id },
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
            throw new ApolloError(
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
            throw new ApolloError(
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
  },
  Query: {
    conversation: combineResolvers(
      isAuthenticated,
      async (_, __, { userId }) => {
        try {
          const conversation = await Conversation.findOne({
            participants: { userId },
          }).populate({
            path: "participants.userId",
            model: "User",
          });
          if (!conversation) {
            throw new ApolloError("Account not found", "ACCOUNT_NOT_FOUND");
          }
          return account;
        } catch (error) {
          console.log(error);
          throw error;
        }
      }
    ),
    getConversation: async (_, { id }, __) => {
      if (!isValid(id)) {
        throw new ApolloError("Provided ID is not valid", "INVALID_OBJECT_ID");
      }
      return await Conversation.findById(id).populate({
        path: "participants.userId",
        model: "User",
      });
    },
    conversations: async () =>
      await Conversation.find({}).populate({
        path: "participants.userId",
        model: "User",
      }),
  },
};
