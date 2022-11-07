const { gql } = require("apollo-server")

module.exports = gql`
  type Supplier {
    id: ID
    name: String
    accountID: ID
    addressId: ID
    isActive: Boolean
    area: String
    createdAt: Date
    updatedAt: Date
  }

  input CreateSupplierInput {
    id: ID
    name: String
    accountID: ID
    addressId: ID
    isActive: Boolean
    area: String
    updatedAt: Date
  }

  input UpdateSupplierInput {
    name: String
    accountID: ID
    addressId: ID
    isActive: Boolean
    area: String
    updatedAt: Date
  }

  extend type Query {
    supplier: Supplier
    getSupplier(id: ID): Supplier
    suppliers: [Supplier!]
  }

  extend type Mutation {
    createSupplier(createSupplierInput: CreateSupplierInput): Supplier
    updatSupplier(updateSupplierInput: UpdateSupplierInput): Supplier
  }
`
