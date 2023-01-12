import { GraphQLError } from 'graphql'
const Bank = require( "../../models/bank" )
const { combineResolvers } = require( "graphql-resolvers" )
const { isAuthenticated } = require( "./middleware" )
const { isValid } = require( "../../helpers/validateId" )

module.exports = {
  Mutation: {
    createBank: async ( _, { createBankInput } ) =>
    {
      try
      {
        // See if an old bank exists with same name and branch
        const oldBankByBranch = await Bank.findOne( {
          name: createBankInput.name,
          branch: createBankInput.branch,
        } )

        if ( oldBankByBranch )
        {
          throw new GraphQLError(
            `An bank already with name ${createBankInput.name} and branch ${createBankInput.branch}`,
          )
        }

        // Build mongoose model
        const newBank = new Bank( {
          ...createBankInput,
        } )

        // Save the user object
        const res = await newBank.save()

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
    updateBank: combineResolvers(
      isAuthenticated,
      async ( _, { updateBankInput } ) =>
      {
        try
        {
          // See if an old user exists with same email
          const oldBank = await Bank.findById( updateBankInput.id )

          if ( !oldBank )
          {
            throw new GraphQLError(
              "No bank was found with ID " + updateBankInput.id,
            )
          }

          // Update old account
          const res = await Bank.findOneAndUpdate(
            { id: updateBankInput.id },
            { updateBankInput },
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
    bank: combineResolvers( isAuthenticated, async ( _, __, { userId } ) =>
    {
      try
      {
        const account = await Bank.findOne( { customerId: userId } )
        if ( !account )
        {
          throw new GraphQLError( "Account not found", )
        }
        return account
      } catch ( error )
      {
        console.log( error )
        throw error
      }
    } ),
    getBank: async ( _, { id }, __ ) =>
    {
      if ( !isValid( id ) )
      {
        throw new GraphQLError( "Provided ID is not valid", )
      }
      return await Bank.findById( id )
    },
    banks: async () => await Bank.find( {} ),
  },
}
