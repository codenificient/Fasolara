import { combineResolvers } from "graphql-resolvers"
import { PubSub, withFilter } from "graphql-subscriptions"
import { gql } from "graphql-tag"

import { ApolloError, isValid } from '../../helpers/grahql.js'
import Order from "../../models/order.js"
import { isAuthenticated } from "../middleware/index.js"

const pubsub = new PubSub()

const typeDefs = gql`
  """
  The Order model is used for procurement of necessary goods and services
  """
  type Order {
    id: ID
    orderDate: Date
    userId: ID
    deliveryUserId: ID
    supplierId: ID
    quantity: Float
    purchaseCost: Float
    finalCost: Float
    currency: String
    finalCurrency: String
    status: String
    updates: [Update]
    createdAt: Date
    updatedAt: Date
  }

  type Update {
    userId: ID
    comment: String
    date: Date
  }

  input CreateOrderInput {
    id: ID
    orderDate: Date
    userId: ID
    supplierId: ID
    quantity: Float
    purchaseCost: Float
    finalCost: Float
    finalCurrency: String
    currency: String
    status: String
    updatedAt: Date
  }

  input UpdateOrderInput {
    orderDate: Date
    userId: ID
    supplierId: ID
    deliveryUserId: ID
    quantity: Float
    purchaseCost: Float
    currency: String
    status: String
    finalCost: Float
    finalCurrency: String
    updatedAt: Date
    update: UpdateInput
  }

    input UpdateInput {
    userId: ID
    comment: String
    date: Date
  }

  extend type Query {
    pastOrders: [Order]
    getOrder(id: ID): Order
    orders: [Order!]
  }

  extend type Mutation {
    createOrder(createOrderInput: CreateOrderInput): Order
    updateOrder(updateOrderInput: UpdateOrderInput): Order
  }
  extend type Subscription {
    orderCreated: Order
    orderUpdated: Order
    orderDeleted: Boolean
  }
`

const resolvers = {
	Query: {
		pastOrders: combineResolvers( isAuthenticated, async ( _, __, { userId } ) =>
		{
			try
			{
				return await Order.find( { userId } )
			}
			catch ( error )
			{
				console.log( error )
				throw error
			}
		} ),
		getOrder: async ( _, { id }, __ ) =>
		{
			if ( !isValid( id ) )
			{
				return ApolloError( "Provided ID is not valid", "INVALID_ID" )
			}
			return await Order.findById( id )
		},
		orders: async () => await Order.find( {} ),
	},
	Mutation: {
		createOrder: async ( _, { createOrderInput } ) =>
		{
			try
			{
				// See if an old comment exists with same timestamp and user
				const oldOrder = await Order.findOne( {
					orderDate: createOrderInput.orderDate,
					userId: createOrderInput.userId,
				} )
				if ( oldOrder )
				{
					return ApolloError( `An order already exists with user ${createOrderInput.userId} and timestamp ${createOrderInput.orderDate}`, "ORDER_EXISTS" )
				}
				// Build mongoose model
				const newOrder = new Order( {
					...createOrderInput,
				} )
				// Save the user object
				const res = await newOrder.save()
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
		updateOrder: combineResolvers( isAuthenticated, async ( _, { updateOrderInput } ) =>
		{
			try
			{
				// See if an old user exists with same email
				const oldOrder = await Order.findById( updateOrderInput.id )
				if ( !oldOrder )
				{
					return ApolloError( "No Order was found with ID " + updateOrderInput.id, "INVALID_ID" )
				}
				// Update old account
				const res = await Order.findOneAndUpdate( { id: updateOrderInput.id }, { updateOrderInput }, { new: true } )
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
		orderUpdated: {
			subscribe: () => pubsub.asyncIterator( "orderUpdated" ),
		},
		orderDeleted: {
			subscribe: () => pubsub.asyncIterator( "orderDeleted" ),
		},
	},
}

export { resolvers, typeDefs }

