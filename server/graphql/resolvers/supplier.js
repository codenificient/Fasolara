const { ApolloError } = require("apollo-server-errors")
const Supplier = require("../../models/supplier")
const { combineResolvers } = require("graphql-resolvers")
const { isAuthenticated } = require("./middleware")
const { isValid } = require("../../helpers/validateId")

module.exports = {
  Mutation: {
    createSupplier: async (_, { createSupplierInput }) => {
      try {
        // See if an old comment exists with same user and message
        const oldSupplier = await Supplier.findOne({
          userId: createSupplierInput.userId,
        })

        if (oldSupplier) {
          throw new ApolloError(
            `A Supplier already exists with ID ${createSupplierInput.userId}`,
            "Supplier_ALREADY_EXISTS"
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
              "Supplier_NOT_FOUND"
            )
          }

          // Update old account
          const res = await Supplier.findOneAndUpdate(
            { id: updateSupplierInput.id },
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
    supplier: combineResolvers(isAuthenticated, async (_, __, { teamId }) => {
      try {
        // Return all the projects where 1 of the teamIds matches the team this user is part of
        return await Project.find({ teamIds: { $in: [teamId] } })
      } catch (error) {
        console.log(error)
        throw error
      }
    }),
    getSupplier: async (_, { id }, __) => {
      if (!isValid(id)) {
        throw new ApolloError("Provided ID is not valid", "INVALID_OBJECT_ID")
      }
      return await Supplier.findById(id)
    },
    Suppliers: async () => await Supplier.find({}),
  },
}
