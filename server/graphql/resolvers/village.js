const { ApolloError } = require("apollo-server-errors")
const Village = require("../../models/village")
const { combineResolvers } = require("graphql-resolvers")
const { isAuthenticated } = require("./middleware")
const { isValid } = require("../../helpers/validateId")

module.exports = {
  Mutation: {
    createVillage: async (_, { createVillageInput }) => {
      try {
        // See if an old comment exists with same name
        const oldVillage = await Village.findOne({
          name: createVillageInput.name,
        })

        if (oldVillage) {
          throw new ApolloError(
            `A Village already exists with name ${createVillageInput.name}`,
            "VILLAGE_ALREADY_EXISTS"
          )
        }
        // Build mongoose model
        const newVillage = new Village({
          ...createVillageInput,
        })

        // Save the user object
        const res = await newVillage.save()

        return {
          id: res.id,
          ...res._doc,
        }
      } catch (error) {
        console.log(error)
        throw error
      }
    },
    updateVillage: combineResolvers(
      isAuthenticated,
      async (_, { updateVillageInput }) => {
        try {
          // See if an old user exists with same email
          const oldVillage = await Village.findById(updateVillageInput.id)

          if (!oldVillage) {
            throw new ApolloError(
              "No Village was found with ID " + updateVillageInput.id,
              "VILLAGE_NOT_FOUND"
            )
          }

          // Update old account
          const res = await Village.findOneAndUpdate(
            { _id: updateVillageInput.id },
            { updateVillageInput },
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
  /* fieldName:(root, args, context, info) => { result } */
  Query: {
    village: combineResolvers(isAuthenticated, async (_, __, { addressId }) => {
      try {
        const address = await Address.findById(  addressId)
        if (address) {
          return await Village.findById( address.villageId)
        }
      } catch (error) {
        console.log(error)
        throw error
      }
    }),
    getVillage: async (_, { id }) => {
      if (!isValid(id)) {
        throw new ApolloError("Provided ID is not valid", "INVALID_OBJECT_ID")
      }
      return await Village.findById(id)
    },
    villages: async () => await Village.find({}),
  },
}
