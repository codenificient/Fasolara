const { ApolloError } = require("apollo-server-errors")
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
          throw new ApolloError(
            `A Country already exists with name ${createCountryInput.name}`,
            "COUNTRY_ALREADY_EXISTS"
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
            throw new ApolloError(
              "No Country was found with ID " + updateCountryInput.id,
              "COUNTRY_NOT_FOUND"
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
        throw new ApolloError("Provided ID is not valid", "INVALID_OBJECT_ID")
      }
      return await Comment.findById(id)
    },
    countries: async () => await Comment.find({}),
  },
}
