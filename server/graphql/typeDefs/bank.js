const { gql } = require("apollo-server")

module.exports = gql`
  """
  The Bank model stores information about partner banks to support admin tasks
  """
  type Bank {
    id: ID
    name: String
    addressId: ID
    branch: String
    createdAt: Date
    updatedAt: Date
  }

  input CreateBankInput {
    id: ID
    name: String
    addressId: ID
    branch: String
    updatedAt: Date
  }

  input UpdateBankInput {
    name: String
    addressId: ID
    branch: String
    updatedAt: Date
  }

  extend type Query {
    bank: Bank
    getBank(id: ID): Bank
    banks: [Bank!]
  }

  extend type Mutation {
    createBank(createBankInput: CreateBankInput): Bank
    updateBank(updateBankInput: UpdateBankInput): Bank
  }
`
