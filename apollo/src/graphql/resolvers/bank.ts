import { GraphQLError } from 'graphql'
import { combineResolvers } from "graphql-resolvers"
import { isValid } from "../../helpers/validateId"
import { BankModel } from "../../models/bank"
import { isAuthenticated } from "./middleware"

interface CreateBankInput
{
  id: string
  name: string
  addressId: string
  branch: string
  createdAt: Date
  updatedAt: Date
}

export const bankResolvers = {
  Mutation: {
    createBank: async ( createBankInput: CreateBankInput  ) =>
    {
      try
      {
        // See if an old bank exists with same name and branch
        const oldBankByBranch = await BankModel.findOne( {
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
        const newBank = new BankModel( {
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
          const oldBank = await BankModel.findById( updateBankInput.id )

          if ( !oldBank )
          {
            throw new GraphQLError(
              "No bank was found with ID " + updateBankInput.id,
            )
          }

          // Update old account
          const res = await BankModel.findOneAndUpdate(
            { id: updateBankInput.id },
            { updateBankInput },
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
    bank: combineResolvers( isAuthenticated, async ( userId: string ) =>
    {
      try
      {
        const account = await BankModel.findOne( { customerId: userId } )
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
    getBank: async (id: string) =>
    {
      if ( !isValid( id ) )
      {
        throw new GraphQLError( "Provided ID is not valid" )
      }
      return await BankModel.findById( id )
    },
    banks: async () => await BankModel.find( {} ),
  },
}
