const { ApolloError } = require("apollo-server-errors")
const Comment = require("../../models/comment")
const { combineResolvers } = require("graphql-resolvers")
const { isAuthenticated } = require("./middleware")
const { isValid } = require("../../helpers/validateId")

module.exports = {
  Mutation: {
    createComment: async (_, { createCommentInput }) => {
      try {
        // See if an old comment exists with same user and message
        const oldCommentByUser = await Comment.findOne({
          userId: createCommentInput.userId,
          content: createCommentInput.content,
        })

        if (oldCommentByUser) {
          throw new ApolloError(
            `A comment already exists with user ${createCommentInput.userId} and content ${createCommentInput.content}`,
            "COMMENT_ALREADY_EXISTS"
          )
        }
        // Build mongoose model
        const newComment = new Comment({
          ...createCommentInput,
        })

        // Save the user object
        const res = await newComment.save()

        return {
          id: res.id,
          ...res._doc,
        }
      } catch (error) {
        console.log(error)
        throw error
      }
    },
    updateComment: combineResolvers(
      isAuthenticated,
      async (_, { updateCommentInput }) => {
        try {
          // See if an old user exists with same email
          const oldComment = await Comment.findById(updateCommentInput.id)

          if (!oldComment) {
            throw new ApolloError(
              "No comment was found with ID " + updateCommentInput.id,
              "COMMENT_NOT_FOUND"
            )
          }

          // Update old account
          const res = await Comment.findOneAndUpdate(
            { _id: updateCommentInput.id },
            { updateCommentInput },
            { new: true }
          )

          return {
            id: res.id,
            ...res._doc,
          }
        } catch (error) {
          console.log(error)
          throw error
        }
      }
    ),
  },
  Query: {
    /* fieldName:(root, args, context, info) => { result } */
    comment: combineResolvers(isAuthenticated, async (_, __, { userId }) => {
      try {
        const account = await Comment.findOne({ customerId: userId })
        if (!account) {
          throw new ApolloError("Account not found", "ACCOUNT_NOT_FOUND")
        }
        return account
      } catch (error) {
        console.log(error)
        throw error
      }
    }),
    getComment: async (_, { id }) => {
      if (!isValid(id)) {
        throw new ApolloError("Provided ID is not valid", "INVALID_OBJECT_ID")
      }
      return await Comment.findById(id)
    },
    comments: async () => await Comment.find({}),
  },
}
