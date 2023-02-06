import { PubSub, withFilter } from 'graphql-subscriptions'
import { gql } from 'graphql-tag'
import Bank from '../../models/bank.js'

const pubsub = new PubSub()

const typeDefs = gql`
  type Bank {
    name: String
    location: String
  }
  extend type Query {
    banks: [Bank]
  }
  extend type Mutation {
    createBank(
        name: String,
        location: String
    ): Bank
  }
  extend type Subscription {
    bankCreated: Bank
  }
`

const resolvers = {
	Query: {
		banks: async ( _, args ) =>
		{
			return await Bank.find()
		},
	},
	Mutation: {
		createBank: async ( _, args, ) =>
		{
			const bank = new Bank( {
				name: args.name,
				location: args.location,
			} )
			await bank.save()
			pubsub.publish( 'bankCreated', { bankCreated: bank } )
			return bank
		},
	},
	Subscription: {
		bankCreated: {
			subscribe: withFilter(
				() => pubsub.asyncIterator( 'bankCreated' ),
				( payload, variables ) =>
				{
					return payload.bankCreated.location === variables.location
				}
			),
		},
	},
}

export { resolvers, typeDefs }
