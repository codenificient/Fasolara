const { gql } = require("apollo-server")

module.exports = gql`
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
    createdAt: Date
    updatedAt: Date
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
    order: Order
    getOrder(id: ID): Order
    orders: [Order!]
  }

  extend type Mutation {
    createOrder(createOrderInput: CreateOrderInput): Order
    updatOrder(updateOrderInput: UpdateOrderInput): Order
  }
`
