const { gql } = require("apollo-server")

module.exports = gql`
  """
  The Comment model is a simple way to add comments to other models during normal business operations.
  """
  type Comment {
    id: ID
    is_removed: Boolean
    userId: ID
    index: Int
    createdAt: Date
    updatedAt: Date
  }

  input CreateCommentInput {
    id: ID
    is_removed: Boolean
    userId: ID
    index: Int
    updatedAt: Date
  }

  input UpdateCommentInput {
    id: ID
    is_removed: Boolean
    userId: ID
    index: Int
    updatedAt: Date
  }

  extend type Query {
    comment: Comment
    getComment(id: ID): Comment
    comments: [Comment!]
  }

  extend type Mutation {
    createComment(createCommentInput: CreateCommentInput): Comment
    updatComment(updateCommentInput: UpdateCommentInput): Comment
  }
`
