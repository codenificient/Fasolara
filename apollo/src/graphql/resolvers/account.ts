import { GraphQLError } from 'graphql'
import { combineResolvers } from "graphql-resolvers"
import Account from "../../models/account"
import { isAuthenticated } from "./middleware"

module.exports = {
  Mutation: {
    createAccount: async ( _, { createAccountInput } ) =>
    {
      try
      {
        // See if an old account exists with same userId
        const oldAccountByUser = await Account.findOne( {
          id: createAccountInput.customerId,
        } )
        // See if an old account exists with same accountNumber
        const oldAccountByAccount = await Account.findOne( {
          accountNumber: createAccountInput.accountNumber,
        } )

        if ( oldAccountByUser )
        {
          throw new GraphQLError(
            "An account already exists for user  " +
            createAccountInput.customerId,
          )
        } else if ( oldAccountByAccount )
        {
          throw new GraphQLError(
            "An account already exists for accountNumber  " +
            createAccountInput.accountNumber,
          )
        }

        // Build mongoose model
        const newAccount = new Account( {
          ...createAccountInput,
        } )

        // Save the user object
        const res = await newAccount.save()

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
    updateAccount: combineResolvers(
      isAuthenticated,
      async ( _, { updateAccountInput } ) =>
      {
        try
        {
          // See if an old user exists with same email
          const oldAccount = await Account.findById( updateAccountInput.id )

          if ( !oldAccount )
          {
            throw new GraphQLError(
              "No account was found with ID " + updateAccountInput.id,
            )
          }

          // Update old account
          const res = await Account.findOneAndUpdate(
            { id: updateAccountInput.id },
            { updateAccountInput },
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
    account: combineResolvers( isAuthenticated, async ( _, __, { userId } ) =>
    {
      try
      {
        const account = await Account.findOne( { customerId: userId } )
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
    accounts: async () => await Account.find( {} ),
  },
}
