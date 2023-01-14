import { GraphQLError } from 'graphql'
const Order = require( "../../models/order" )
const { combineResolvers } = require( "graphql-resolvers" )
const { isAuthenticated } = require( "./middleware" )
const { isValid } = require( "../../helpers/validateId" )

module.exports = {
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
          throw new GraphQLError(
            `An order already exists with user ${createOrderInput.userId} and timestamp ${createOrderInput.orderDate}`,
          )
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
      } catch ( error )
      {
        console.log( error )
        throw error
      }
    },
    updateOrder: combineResolvers(
      isAuthenticated,
      async ( _, { updateOrderInput } ) =>
      {
        try
        {
          // See if an old user exists with same email
          const oldOrder = await Order.findById( updateOrderInput.id )

          if ( !oldOrder )
          {
            throw new GraphQLError(
              "No Order was found with ID " + updateOrderInput.id,
            )
          }

          // Update old account
          const res = await Order.findOneAndUpdate(
            { id: updateOrderInput.id },
            { updateOrderInput },
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
    pastOrders: combineResolvers( isAuthenticated, async ( _, __, { userId } ) =>
    {
      try
      {
        return await Order.find( { userId } )
      } catch ( error )
      {
        console.log( error )
        throw error
      }
    } ),
    getOrder: async ( _, { id }, __ ) =>
    {
      if ( !isValid( id ) )
      {
        throw new GraphQLError( "Provided ID is not valid", )
      }
      return await Order.findById( id )
    },
    orders: async () => await Order.find( {} ),
  },
}