import gql from 'graphql-tag'

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
    createdAt: Date
    updatedAt: Date
  }

  input CreateCommentInput {
    id: ID
    isDisabled: Boolean
    userId: ID
    index: Int
    updatedAt: Date
  }

  input UpdateCommentInput {
    id: ID
    isDisabled: Boolean
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
    updateComment(updateCommentInput: UpdateCommentInput): Comment
  }
`
