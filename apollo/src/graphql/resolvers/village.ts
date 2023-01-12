import { GraphQLError } from 'graphql'
const Village = require("../../models/village")
const Address = require("../../models/address")
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
          throw new GraphQLError(
            `A Village already exists with name ${createVillageInput.name}`,
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
            throw new GraphQLError(
              "No Village was found with ID " + updateVillageInput.id,
            )
          }

          // Update old account
          const res = await Village.findOneAndUpdate(
            { id: updateVillageInput.id },
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
  Query: {
    village: combineResolvers(isAuthenticated, async (_, __, { addressId }) => {
      try {
        const address = await Address.findOne({ id: addressId })
        if (address) {
          const village = await Village.findOne({
            villageId: address.villageId,
          })
          return village
        }
      } catch (error) {
        console.log(error)
        throw error
      }
    }),
    getVillage: async (_, { id }, __) => {
      if (!isValid(id)) {
        throw new GraphQLError("Provided ID is not valid")
      }
      return await Village.findById(id)
    },
    villages: async () => await Village.find({}),
  },
}
