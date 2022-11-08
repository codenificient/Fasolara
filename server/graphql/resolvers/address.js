const { ApolloError } = require("apollo-server-errors")
const Address = require("../../models/address")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const { combineResolvers } = require("graphql-resolvers")
const { isAuthenticated } = require("./middleware")

module.exports = {
  Mutation: {
    createAddress: combineResolvers(
      isAuthenticated,
      async (_, { createAddressInput }) => {
        try {
          // See if an old user exists with same email
          const oldAddress = await Address.findOne({
            address: createAddressInput.address,
          })

          if (oldAddress) {
            throw new ApolloError(
              "An address already exists with address" +
                createAddressInput.address,
              "ADDRESS_ALREADY_EXISTS"
            )
          }

          // Build mongoose model
          const newAddress = new Address({
            ...createAddressInput,
          })

          // Save the user object
          const res = await newAddress.save()

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
    address: combineResolvers(isAuthenticated, async (_, __, { addressId }) => {
      try {
        const address = await Address.findById({ addressId })
        if (!account) {
          throw new ApolloError("Account not found", "ACCOUNT_NOT_FOUND")
        }
        return account
      } catch (error) {
        console.log(error)
        throw error
      }
    }),
    getAddress: async (id) => {
      return Address.findById(id)
    },
    addresses: async () => await Address.find({}),
  },
}
