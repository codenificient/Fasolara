export default `

  """
  The Supplier model stores contact information about any business that provides goods and services to our business
  """
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
    supplier(id: ID): Supplier
    suppliers: [Supplier!]
  }

  extend type Mutation {
    createSupplier(createSupplierInput: CreateSupplierInput): Supplier
    updateSupplier(updateSupplierInput: UpdateSupplierInput): Supplier
  }
`
