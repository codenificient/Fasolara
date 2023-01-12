import { GraphQLError } from 'graphql'
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
          customerId: createTransactionInput.customerId,
          accountId: createTransactionInput.accountId,
          createdAt: createTransactionInput.createdAt,
        })

        if (oldTransaction) {
          throw new GraphQLError(
            `A Transaction already exists with ID ${oldTransaction.id}`,
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
            throw new GraphQLError(
              "No Transaction was found with ID " + updateTransactionInput.id,
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
    pastTransactions: combineResolvers(
      isAuthenticated,
      async (_, __, { userId }) => {
        try {
          const inTransactions = await Transaction.find({
            beneficiaryId: userId,
          })
          const outTransactions = await Transaction.find({ accountId: userId })
          return [...inTransactions, ...outTransactions]
        } catch (error) {
          console.log(error)
          throw error
        }
      }
    ),
    getTransaction: async (_, { id }, __) => {
      if (!isValid(id)) {
        throw new GraphQLError("Provided ID is not valid", )
      }
      return await Transaction.findById(id)
    },
    transactions: async () => await Transaction.find({}),
  },
}
