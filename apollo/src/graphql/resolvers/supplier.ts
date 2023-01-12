import { GraphQLError } from 'graphql'
const Supplier = require( "../../models/supplier" )
const { combineResolvers } = require( "graphql-resolvers" )
const { isAuthenticated } = require( "./middleware" )
const { isValid } = require( "../../helpers/validateId" )

module.exports = {
  Mutation: {
    createSupplier: async ( _, { createSupplierInput } ) =>
    {
      try
      {
        // See if an old comment exists with same accountId
        const oldSupplier = await Supplier.findOne( {
          accountID: createSupplierInput.accountID,
        } )

        if ( oldSupplier )
        {
          throw new GraphQLError(
            `A Supplier already exists with ID ${createSupplierInput.accountID}`,
          )
        }
        // Build mongoose model
        const newSupplier = new Supplier( {
          ...createSupplierInput,
        } )

        // Save the user object
        const res = await newSupplier.save()

        return {
          id: res.id,
          ...res._doc,
        }
      } catch ( error )
      {
        console.log( error )
        throw error
      }
    },
    updateSupplier: combineResolvers(
      isAuthenticated,
      async ( _, { updateSupplierInput } ) =>
      {
        try
        {
          // See if an old user exists with same email
          const oldSupplier = await Supplier.findById( updateSupplierInput.id )

          if ( !oldSupplier )
          {
            throw new GraphQLError(
              "No Supplier was found with ID " + updateSupplierInput.id,
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
        } catch ( error )
        {
          console.log( error )
          throw error
        }
      }
    ),
  },
  Query: {
    supplier: async ( _, { id }, __ ) =>
    {
      if ( !isValid( id ) )
      {
        throw new GraphQLError( "Provided ID is not valid", )
      }
      return await Supplier.findById( id )
    },
    suppliers: async () => await Supplier.find( {} ),
  },
}
