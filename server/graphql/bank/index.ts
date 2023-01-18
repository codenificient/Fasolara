import { PubSub, withFilter } from "graphql-subscriptions"
import { gql } from "graphql-tag"
import { combineResolvers } from "graphql-resolvers"

import Bank from "../../models/bank.js"
import { isAuthenticated } from "../middleware/index.js";
import { ApolloError, isValid } from '../../helpers/grahql.js'

const pubsub = new PubSub()

const typeDefs = gql`
  type Bank {
    id: ID
    name: String
    addressId: ID
    branch: String
    createdAt: Date
    updatedAt: Date
  }

  input CreateBankInput {
    id: ID
    name: String
    addressId: ID
    branch: String
    updatedAt: Date
  }

  input UpdateBankInput {
    name: String
    addressId: ID
    branch: String
    updatedAt: Date
  }

  extend type Query {
    bank: Bank
    getBank(id: ID): Bank
    banks: [Bank!]
  }
  extend type Mutation {
    createBank(createBankInput: CreateBankInput): Bank
    updateBank(updateBankInput: UpdateBankInput): Bank
    removeBank(id: ID): Boolean
  }
  extend type Subscription {
    bankCreated: Bank
  }
`

const resolvers = {
  Query: {
    /* fieldName:(root, args, context, info) => { result } */
    bank: combineResolvers( isAuthenticated, async ( _, __, { userId } ) =>
    {
      try
      {
        const account = await Bank.findOne( { customerId: userId } )
        if ( !account )
        {
          return ApolloError( "Account not found", "ACCOUNT_NOT_FOUND" )
        }
        return account
      }
      catch ( error )
      {
        console.log( error )
        throw error
      }
    } ),
    getBank: async ( _, { id } ) =>
    {
      if ( !isValid( id ) )
      {
        return ApolloError( "Provided ID is not valid", "INVALID_OBJECT_ID" )
      }
      return await Bank.findById( id )
    },
    banks: async () => await Bank.find( {} ),
  },
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
          return ApolloError( `An bank already with name ${createBankInput.name} and branch ${createBankInput.branch}`, "BANK_ALREADY_EXISTS" )
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
      }
      catch ( error )
      {
        console.log( error )
        throw error
      }
    },
    updateBank: combineResolvers( isAuthenticated, async ( _, { updateBankInput } ) =>
    {
      try
      {
        // See if an old user exists with same email
        const oldBank = await Bank.findById( updateBankInput.id )
        if ( !oldBank )
        {
          return ApolloError( "No bank was found with ID " + updateBankInput.id, "ACCOUNT_NOT_FOUND" )
        }
        // Update old account
        const res = await Bank.findOneAndUpdate( { _id: updateBankInput.id }, { updateBankInput }, { new: true } )
        return {
          id: res.id,
          ...res._doc,
        }
      }
      catch ( error )
      {
        console.log( error )
        throw error
      }
    } ),
    removeBank:  async ( id: string ) => await Bank.findByIdAndRemove( { _id: id })
  },
  Subscription: {
    bankCreated: {
      subscribe: withFilter(
        () => pubsub.asyncIterator( "bankCreated" ),
        ( payload, variables ) =>
        {
          return payload.bankCreated.location === variables.location
        }
      ),
    },
  },
}

export { resolvers, typeDefs }

