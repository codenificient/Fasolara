const { ApolloError } = require("apollo-server-errors")
const Transaction = require("../../models/transaction")
const { combineResolvers } = require("graphql-resolvers")
const { isAuthenticated } = require("./middleware")
const { isValid } = require("../../helpers/validateId")

module.exports = {
  Mutation: {
    createTransaction: async (_, { createTransactionInput }) => {
      try {
        // See if an old comment exists with same user and message
        const oldTransaction = await Transaction.findOne({
          userId: createTransactionInput.userId,
        })

        if (oldTransaction) {
          throw new ApolloError(
            `A Transaction already exists with ID ${createTransactionInput.userId}`,
            "Transaction_ALREADY_EXISTS"
          )
        }
        // Build mongoose model
        const newTransaction = new Transaction({
          ...createTransactionInput,
        })

        // Save the user object
        const res = await newTransaction.save()

        return {
          id: res.id,
          ...res._doc,
        }
      } catch (error) {
        console.log(error)
        throw error
      }
    },
    updateTransaction: combineResolvers(
      isAuthenticated,
      async (_, { updateTransactionInput }) => {
        try {
          // See if an old user exists with same email
          const oldTransaction = await Transaction.findById(
            updateTransactionInput.id
          )

          if (!oldTransaction) {
            throw new ApolloError(
              "No Transaction was found with ID " + updateTransactionInput.id,
              "Transaction_NOT_FOUND"
            )
          }

          // Update old account
          const res = await Transaction.findOneAndUpdate(
            { id: updateTransactionInput.id },
            { updateTransactionInput },
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
    getTransaction: async (_, { id }, __) => {
      if (!isValid(id)) {
        throw new ApolloError("Provided ID is not valid", "INVALID_OBJECT_ID")
      }
      return await Transaction.findById(id)
    },
    transactions: async () => await Transaction.find({}),
  },
}
