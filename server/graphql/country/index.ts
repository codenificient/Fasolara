import { combineResolvers } from "graphql-resolvers"
import { PubSub, withFilter } from "graphql-subscriptions"
import { gql } from "graphql-tag"

import { ApolloError, isValid } from '../../helpers/grahql.js'
import Country from "../../models/country.js"
import { isAuthenticated } from "../middleware/index.js"

const pubsub = new PubSub()

const typeDefs = gql`
  """
  The Country model stores some countries of interest for business purposes. Can use this to draw maps and poligons in frontend
  """
  type Country {
    id: ID
    name: String
    population: Int
    continent: String
    polycolor: String
    locationId: ID
    createdAt: Date
    updatedAt: Date
  }

  input CreateCountryInput {
    id: ID
    name: String
    population: Int
    continent: String
    locationId: ID
    polycolor: String
    updatedAt: Date
  }

  input UpdateCountryInput {
    name: String
    population: Int
    continent: String
    locationId: ID
    polycolor: String
    updatedAt: Date
  }

  extend type Query {
    country: Country
    getCountry(id: ID): Country
    countries: [Country!]
  }

  extend type Mutation {
    createCountry(createCountryInput: CreateCountryInput): Country
    updateCountry(updateCountryInput: UpdateCountryInput): Country
    removeCountry(id: ID): Boolean
  }
  extend type Subscription {
 countryCreated: Country
   countryUpdated: Country
   countryDeleted: Boolean
  }
`

const resolvers = {
	Query: {
		/* fieldName:(root, args, context, info) => { result } */
		country: combineResolvers( isAuthenticated, async ( _, __,  {user}  ) =>
		{
			try
			{
				const country = await Country.findOne({nationality: user.nationality });
				if ( !country )
				{
					return ApolloError( "Country not found", "COUNTRY_NOT_FOUND" )
				}
				return country
			}
			catch ( error )
			{
				console.log( error )
				throw error
			}
		} ),
		getCountry: async ( _, { id } ) =>
		{
			if ( !isValid( id ) )
			{
				return ApolloError( "Provided ID is not valid", "INVALID_OBJECT_ID" )
			}
			return await Country.findById( id )
		},
		countries: async () => await Country.find( {} ),
	},
	Mutation: {
		createCountry: async ( _, { createCountryInput } ) =>
		{
			try
			{
				// See if an old Country exists with same name and branch
				const oldCountryByName = await Country.findOne( {
					name: createCountryInput.name,
				} )
				if ( oldCountryByName )
				{
					return ApolloError( `An Country already with name ${createCountryInput.name}`, "Country_ALREADY_EXISTS" )
				}
				// Build mongoose model
				const newCountry = new Country( {
					...createCountryInput,
				} )
				// Save the user object
				const res = await newCountry.save()
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
		updateBank: combineResolvers( isAuthenticated, async ( _, { updateCountryInput } ) =>
		{
			try
			{
				// See if an old user exists with same email
				const oldCountry = await Country.findById( updateCountryInput.id )
				if ( !oldCountry )
				{
					return ApolloError( "No country was found with ID " + updateCountryInput.id, "COUNTRY_NOT_FOUND" )
				}
				// Update old account
				const res = await Country.findOneAndUpdate( { _id: updateCountryInput.id }, { updateCountryInput }, { new: true } )
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
		removeCountry: async ( id: string ) => await Country.findByIdAndDelete( id )
	},
	Subscription: {
		countryCreated: {
			subscribe: withFilter(
				() => pubsub.asyncIterator( "countryCreated" ),
				( payload, variables ) =>
				{
					return payload.bankCreated.location === variables.location
				}
			),
		},
		countryUpdated: {
			subscribe: () => pubsub.asyncIterator( 'countryUpdated' ),
		},
		countryDeleted: {
			subscribe: () => pubsub.asyncIterator( 'countryDeleted' ),
		},
	},
}

export { resolvers, typeDefs }

