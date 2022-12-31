import { GraphQLError } from 'graphql'
import { combineResolvers } from "graphql-resolvers"
import { AccountModel } from "../../models/account"
import { isAuthenticated } from "./middleware"

  interface CreateAccountInput {
  id: string
  balance: number
  debtAmount: number
  lifetimeEarning: number
  accountNumber: string
  solarGroup: string
  carrier: string
  customerId: string
  loaningBankId: string
  }

export const accountResolvers = {
  Mutation: {
    createAccount: async ( createAccountInput: CreateAccountInput  ) =>
    {
      try
      {
        // See if an old account exists with same userId
        const oldAccountByUser = await AccountModel.findOne( {
          id: createAccountInput.customerId,
        } )
        // See if an old account exists with same accountNumber
        const oldAccountByAccount = await AccountModel.findOne( {
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
        const newAccount = new AccountModel( {
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
          const oldAccount = await AccountModel.findById( updateAccountInput.id )

          if ( !oldAccount )
          {
            throw new GraphQLError(
              "No account was found with ID " + updateAccountInput.id,
            )
          }

          // Update old account
          const res = await AccountModel.findOneAndUpdate(
            { id: updateAccountInput.id },
            { updateAccountInput },
            { new: true }
          )
          if ( res )
          {
            return {
              id: res.id,
              ...res._doc,
            }
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
        const account = await AccountModel.findOne( { customerId: userId } )
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
    accounts: async () => await AccountModel.find( {} ),
  },
}

