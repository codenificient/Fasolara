const { ApolloError } = require("apollo-server-errors")
const Supplier = require("../../models/supplier")
const { combineResolvers } = require("graphql-resolvers")
const { isAuthenticated } = require("./middleware")
const { isValid } = require("../../helpers/validateId")

module.exports = {
  Mutation: {
    createSupplier: async (_, { createSupplierInput }) => {
      try {
        // See if an old comment exists with same accountId
        const oldSupplier = await Supplier.findOne({
          accountId: createSupplierInput.accountId,
        })

        if (oldSupplier) {
          throw new ApolloError(
            `A Supplier already exists with ID ${createSupplierInput.accountId}`,
            "SUPPLIER_ALREADY_EXISTS"
          )
        }
        // Build mongoose model
        const newSupplier = new Supplier({
          ...createSupplierInput,
        })

        // Save the user object
        const res = await newSupplier.save()

        return {
          id: res.id,
          ...res._doc,
        }
      } catch (error) {
        console.log(error)
        throw error
      }
    },
    updateSupplier: combineResolvers(
      isAuthenticated,
      async (_, { updateSupplierInput }) => {
        try {
          // See if an old user exists with same email
          const oldSupplier = await Supplier.findById(updateSupplierInput.id)

          if (!oldSupplier) {
            throw new ApolloError(
              "No Supplier was found with ID " + updateSupplierInput.id,
              "SUPPLIER_NOT_FOUND"
            )
          }

          // Update old account
          const res = await Supplier.findOneAndUpdate(
            { _id: updateSupplierInput.id },
            { updateSupplierInput },
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
    supplier: async (_, { id }) => {
      if (!isValid(id)) {
        throw new ApolloError("Provided ID is not valid", "INVALID_OBJECT_ID")
      }
      return await Supplier.findById(id)
    },
    suppliers: async () => await Supplier.find({}),
  },
}
