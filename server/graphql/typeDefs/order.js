const { gql } = require("apollo-server")

module.exports = gql`
  type Order {
    id: ID
    orderDate: Date
    userId: ID
    supplierId: ID
    quantity: Float
	purchaseCost: Float
	currency: String
    createdAt: Date
    updatedAt: Date
  }

  input CreateOrderInput {
    id: ID
    name: String
    addressId: ID
    branch: String
    updatedAt: Date
  }

  input UpdateOrderInput {
    name: String
    addressId: ID
    branch: String
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
