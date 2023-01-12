import { GraphQLError } from 'graphql'
const Country = require("../../models/country")
const { combineResolvers } = require("graphql-resolvers")
const { isAuthenticated } = require("./middleware")
const { isValid } = require("../../helpers/validateId")

module.exports = {
  Mutation: {
    createCountry: async (_, { createCountryInput }) => {
      try {
        // See if an old comment exists with same user and message
        const oldCountry = await Country.findOne({
          name: createCountryInput.name,
        })

        if (oldCountry) {
          throw new GraphQLError(
            `A Country already exists with name ${createCountryInput.name}`,
          )
        }
        // Build mongoose model
        const newCountry = new Country({
          ...createCountryInput,
        })

        // Save the user object
        const res = await newCountry.save()

        return {
          id: res.id,
          ...res._doc,
        }
      } catch (error) {
        console.log(error)
        throw error
      }
    },
    updateCountry: combineResolvers(
      isAuthenticated,
      async (_, { updateCountryInput }) => {
        try {
          // See if an old user exists with same email
          const oldCountry = await Country.findById(updateCountryInput.id)

          if (!oldCountry) {
            throw new GraphQLError(
              "No Country was found with ID " + updateCountryInput.id,
            )
          }

          // Update old account
          const res = await Country.findOneAndUpdate(
            { id: updateCountryInput.id },
            { updateCountryInput },
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
    country: async (_, { id }, __) => {
      if (!isValid(id)) {
        throw new GraphQLError("Provided ID is not valid",)
      }
      return await Country.findById(id)
    },
    countries: async () => await Country.find({}),
  },
}
