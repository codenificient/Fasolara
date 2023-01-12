import gql from 'graphql-tag'

module.exports = gql`
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
    updates: [Update!]
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
`
