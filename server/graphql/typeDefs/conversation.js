const { gql } = require("apollo-server");

module.exports = gql`
  """
  The Comment model is a simple way to add comments to other models during normal business operations.
  """
  type Conversation {
    id: ID
    participants: [Participant!]
    status: String
    messages: [Message!]
  }

  type Participant {
    userId: ID!
    connect: String
    avatar: String
    name: String
    phone: String
  }

  input ParticipantInput {
    userId: ID
    connect: String
    avatar: String
    name: String
    phone: String
  }

  type Message {
    senderId: String!
    date: Date
    content: String!
    status: String
  }

  input MessageInput {
    senderId: String!
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
    conversation: Conversation
    getConversation(id: ID): Conversation
    conversations: [Conversation!]
  }

  extend type Mutation {
    createConversation(createConvoInput: CreateConvoInput): Conversation
    updateConversation(updateConvoInput: UpdateConvoInput): Conversation
    updateConvoMsg(addMsgInput: AddMsgInput): Conversation
    updateConvoPpt(addPptInput: AddPptInput): Conversation
  }
`;
