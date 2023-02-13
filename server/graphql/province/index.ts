import { combineResolvers } from "graphql-resolvers"
import { PubSub, withFilter } from "graphql-subscriptions"
import { gql } from "graphql-tag"

import { ApolloError, isValid } from '../../helpers/grahql.js'
import Province from "../../models/province.js"
import { isAuthenticated } from "../middleware/index.js"

const pubsub = new PubSub()

const typeDefs = gql`
  """
  The Province model is a necessary component of Location services for projects. Refactored so we can draw polygon on a map
  """
  type Province {
    id: ID
    name: String
    region: String
    seat: String
    polycolor: String
    zone: String
    countryId: ID
    createdAt: Date
    updatedAt: Date
  }

  input CreateProvinceInput {
    id: ID
    name: String
    region: String
    seat: String
    polycolor: String
    zone: String
    countryId: ID
  }

  input UpdateProvinceInput {
    id: ID
    name: String
    region: String
    seat: String
    polycolor: String
    zone: String
    countryId: ID
    updatedAt: Date
  }

  extend type Query {
    province: Province
    getProvince(id: ID): Province
    provinces: [Province!]
  }

  extend type Mutation {
    createProvince(createProvinceInput: CreateProvinceInput): Province
    updateProvince(updateProvinceInput: UpdateProvinceInput): Province
    removeProvince(id: ID!): Boolean
  }
  extend type Subscription {
		provinceCreated: Province
	provinceUpdated: Province
	provinceDeleted: Boolean
  }
`

const resolvers = {
	Query: {
		/* fieldName:(root, args, context, info) => { result } */
		province: combineResolvers( isAuthenticated, async ( _, __, { provinceId } ) =>
		{
			try
			{
				const province = await Province.findById( provinceId )
				if ( !province )
				{
					return ApolloError( "Province not found", "PROVINCE_NOT_FOUND" )
				}
				return province
			}
			catch ( error )
			{
				console.log( error )
				throw error
			}
		} ),
		getProvince: async ( _, { id } ) =>
		{
			if ( !isValid( id ) )
			{
				return ApolloError( "Provided ID is not valid", "INVALID_OBJECT_ID" )
			}
			return await Province.findById( id )
		},
		provinces: async () => await Province.find( {} ),
	},
	Mutation: {
		createProvince: async ( _, { createProvinceInput } ) =>
		{
			try
			{
				// See if an old Province exists with same name and branch
				const oldProvinceByName = await Province.findOne( {
					name: createProvinceInput.name,
				} )
				if ( oldProvinceByName )
				{
					return ApolloError( `An Province already with name ${createProvinceInput.name}`, "Province_ALREADY_EXISTS" )
				}
				// Build mongoose model
				const newProvince = new Province( {
					...createProvinceInput,
				} )
				// Save the user object
				const res = await newProvince.save()
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
		updateProvince: combineResolvers( isAuthenticated, async ( _, { updateProvinceInput } ) =>
		{
			try
			{
				// See if an old user exists with same email
				const oldProvince = await Province.findById( updateProvinceInput.id )
				if ( !oldProvince )
				{
					return ApolloError( "No Province was found with ID " + updateProvinceInput.id, "PROVINCE_NOT_FOUND" )
				}
				// Update old account
				const res = await Province.findOneAndUpdate( { _id: updateProvinceInput.id }, { updateProvinceInput }, { new: true } )
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
		removeProvince: async ( id: string ) => await Province.findByIdAndRemove( { _id: id } )
	},
	Subscription: {
		provinceCreated: {
			subscribe: withFilter(
				() => pubsub.asyncIterator( "provinceCreated" ),
				( payload, variables ) =>
				{
					return payload.provinceCreated.location === variables.location
				}
			),
		},
		provinceUpdated: {
			subscribe: () => pubsub.asyncIterator( 'provinceUpdated' ),
		},
		provinceDeleted: {
			subscribe: () => pubsub.asyncIterator( 'provinceDeleted' ),
		},
	},
}

export { resolvers, typeDefs }

