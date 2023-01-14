const { ApolloError } = require("apollo-server-errors")
const Investor = require("../../models/investor")
const { combineResolvers } = require("graphql-resolvers")
const { isAuthenticated } = require("./middleware")
const { isValid } = require("../../helpers/validateId")

module.exports = {
  Mutation: {
    createInvestor: async (_, { createInvestorInput }) => {
      try {
        // See if an old comment exists with same user and message
        const oldInvestor = await Investor.findOne({
          userId: createInvestorInput.userId,
        })

        if (oldInvestor) {
          throw new ApolloError(
            `An Investor already exists with ID ${createInvestorInput.userId}`,
            "INVESTOR_ALREADY_EXISTS"
          )
        }
        // Build mongoose model
        const newInvestor = new Investor({
          ...createInvestorInput,
        })

        // Save the user object
        const res = await newInvestor.save()

        return {
          id: res.id,
          ...res._doc,
        }
      } catch (error) {
        console.log(error)
        throw error
      }
    },
    updateInvestor: combineResolvers(
      isAuthenticated,
      async (_, { updateInvestorInput }) => {
        try {
          // See if an old user exists with same email
          const oldInvestor = await Investor.findById(updateInvestorInput.id)

          if (!oldInvestor) {
            throw new ApolloError(
              "No Investor was found with ID " + updateInvestorInput.id,
              "Investor_NOT_FOUND"
            )
          }

          // Update old account
          const res = await Investor.findOneAndUpdate(
            { _id: updateInvestorInput.id },
            { updateInvestorInput },
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
    investor: async (_, { id }) => {
      if (!isValid(id)) {
        throw new ApolloError("Provided ID is not valid", "INVALID_OBJECT_ID")
      }
      return await Investor.findById(id)
    },
    investors: async () => await Investor.find({}),
  },
}
