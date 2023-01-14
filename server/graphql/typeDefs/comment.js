const {gql} = require("apollo-server")

module.exports = gql`
  """
  The Comment model is a simple way to add comments to other models during normal business operations.
  """
  type Comment {
    id: ID
    isDisabled: Boolean
    userId: ID
    user: User
    index: Int
    content: String
    createdBy: ID
    createdAt: Date
    updatedAt: Date
       isActive: Boolean
    isArchived: Boolean
  }

  input CreateCommentInput {
    id: ID
    isDisabled: Boolean
    userId: ID
        content: String
    index: Int
    updatedAt: Date
        createdBy: ID
               isActive: Boolean
    isArchived: Boolean
  }

  input UpdateCommentInput {
    id: ID
    isDisabled: Boolean
    content: String
    userId: ID
    index: Int
    updatedAt: Date
    createdBy: ID
           isActive: Boolean
    isArchived: Boolean
  }

  extend type Query {
    comment: Comment
    getComment(id: ID): Comment
    comments: [Comment!]
  }

  extend type Mutation {
    createComment(createCommentInput: CreateCommentInput): Comment
    updateComment(updateCommentInput: UpdateCommentInput): Comment
  }
`;
