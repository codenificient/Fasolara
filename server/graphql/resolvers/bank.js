const { ApolloError } = require("apollo-server-errors")
const Bank = require("../../models/bank")
const { combineResolvers } = require("graphql-resolvers")
const { isAuthenticated } = require("./middleware")
const { isValid } = require( "../../helpers/validateId" )

module.exports = {
  Mutation: {
    createBank: async (_, { createBankInput }) => {
      try {
        // See if an old bank exists with same name and branch
        const oldBankByBranch = await Bank.findOne({
          name: createBankInput.name,
          branch: createBankInput.branch,
        })

        if (oldBankByBranch) {
          throw new ApolloError(
            `An bank already with name ${updateBankInput.name} and branch ${updateBankInput.branch}`,
            "BANK_ALREADY_EXISTS"
          )
        }

        // Build mongoose model
        const newBank = new Bank({
          ...createBankInput,
        })

        // Save the user object
        const res = await newBank.save()

        return {
          id: res.id,
          ...res._doc,
        }
      } catch (error) {
        console.log(error)
        throw error
      }
    },
    updateBank: combineResolvers(
      isAuthenticated,
      async (_, { updateBankInput }) => {
        try {
          // See if an old user exists with same email
          const oldBank = await Account.findById(updateBankInput.id)

          if (!oldBank) {
            throw new ApolloError(
              "No bank was found with ID " + updateBankInput.id,
              "ACCOUNT_NOT_FOUND"
            )
          }

          // Update old account
          const res = await Bank.findOneAndUpdate(
            { _id: updateBankInput.id },
            { updateBankInput },
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
    bank: combineResolvers(isAuthenticated, async (_, __, { userId }) => {
      try {
        const account = await Bank.findOne({ customerId: userId })
        if (!account) {
          throw new ApolloError("Account not found", "ACCOUNT_NOT_FOUND")
        }
        return account
      } catch (error) {
        console.log(error)
        throw error
      }
    }),
    getBank: async (_, { id }) => {
      if (!isValid(id)) {
        throw new ApolloError("Provided ID is not valid", "INVALID_OBJECT_ID")
      }
      return await Bank.findById(id)
    },
    banks: async () => await Bank.find({}),
  },
}
