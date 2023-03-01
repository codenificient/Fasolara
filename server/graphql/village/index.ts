import { combineResolvers } from "graphql-resolvers"
import { PubSub } from 'graphql-subscriptions'
import { gql } from 'graphql-tag'

import { ApolloError } from '../../helpers/grahql.js'
import Village from '../../models/village.js'
import { isAuthenticated } from "../middleware/index.js"

const pubsub = new PubSub()

const typeDefs = gql`
  """
  The Village model stores basic information about villages where projects will be located. The basic unit of location. These may need to be created on site with a smartphone to capture gps coordinates
  """
  type Village {
    id: ID
    name: String
    population: Int
    provinceId: ID
    dotcolor: String
    urbanCommune: Boolean
    createdAt: Date
    updatedAt: Date
  }

  input CreateVillageInput {
    id: ID
    name: String
    population: Int
    provinceId: ID
    dotcolor: String
    urbanCommune: Boolean
    updatedAt: Date
  }

  input UpdateVillageInput {
    id: ID
    name: String
    population: Int
    provinceId: ID
    dotcolor: String
    urbanCommune: Boolean
    updatedAt: Date
  }

  extend type Query {
    village: Village
    getVillage(id: ID): Village
    villages: [Village!]
  }

  extend type Mutation {
    createVillage(createVillageInput: CreateVillageInput): Village
    updateVillage(updateVillageInput: UpdateVillageInput): Village
    removeVillage(id: ID!): Boolean
  }

  extend type Subscription {
	villageCreated: Village
	villageUpdated: Village
	villageDeleted: Boolean
  }
`

const resolvers = {
	Query: {
		villages: async () => await Village.find(),
		getVillage: async ( _, { id }, ) => await Village.findById( id ),
		village: combineResolvers( isAuthenticated, async ( root, args, {villageId}  ) =>
		{
			try
			{
				const village = await Village.findById( villageId )
				if ( !village )
				{
					return ApolloError( "Village not found", "ACCOUNT_NOT_FOUND" )
				}
				return village
			} catch ( error )
			{
				console.log( error )
				throw error
			}
		} ),
	},
	Mutation: {
		createVillage: async ( root, { createVillageInput } ) =>
		{
			try
			{
				// See if an old account exists with same userId
				const oldVillageByName = await Village.findOne( {
					name: createVillageInput.name,
				} )

				if ( oldVillageByName )
				{
					return ApolloError(
						"An village already exists with name " +
						createVillageInput.name,
						"VILLAGE_ALREADY_EXISTS"
					)
				}

				// Build mongoose model
				const newVillage = new Village( {
					...createVillageInput,
				} )

				// Save the user object
				const res = await newVillage.save()

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
		updateVillage: combineResolvers(
			isAuthenticated,
			async ( _, { updateVillageInput } ) =>
			{
				try
				{
					// See if an old user exists with same email
					const oldVillage = await Village.findById( updateVillageInput.id )

					if ( !oldVillage )
					{
						return ApolloError(
							"No village was found with ID " + updateVillageInput.id,
							"VILLAGE_NOT_FOUND"
						)
					}

					// Update old account
					const res = await Village.findOneAndUpdate(
						{ _id: updateVillageInput.id },
						{ updateVillageInput },
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
		removeVillage: async ( _, { id } ) => await Village.findByIdAndRemove( id )
	},
	Subscription: {
		villageCreated: {
			subscribe: () => pubsub.asyncIterator( 'villageCreated' ),
		},
		villageUpdated: {
			subscribe: () => pubsub.asyncIterator( 'villageUpdated' ),
		},
		villageDeleted: {
			subscribe: () => pubsub.asyncIterator( 'villageDeleted' ),
		},
	}
}

export { typeDefs, resolvers }
