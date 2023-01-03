const { gql } = require("apollo-server")

module.exports = gql`
  """
  The Transaction model stores every monetary transaction, any money moving in and out of the business. Enables data science
  """
  type Transaction {
    id: ID
    customerId: ID
    accountId: ID
    beneficiaryId: ID
    amount: Float
    tax: Float
    taxRate: Float
    currency: String
    memo: String
    status: String
    kind: String
    createdAt: Date
    updatedAt: Date
  }

  input CreateTransactionInput {
    id: ID
    customerId: ID
    accountId: ID
    beneficiaryId: ID
    amount: Float
    tax: Float
    taxRate: Float
    currency: String
    memo: String
    status: String
    kind: String
    updatedAt: Date
  }

  input UpdateTransactionInput {
    id: ID
    customerId: ID
    accountId: ID
    beneficiaryId: ID
    amount: Float
    tax: Float
    taxRate: Float
    currency: String
    memo: String
    status: String
    kind: String
    updatedAt: Date
  }

  extend type Query {
    pastTransactions: [Transaction]
    getTransaction(id: ID): Transaction
    transactions: [Transaction!]
  }

  extend type Mutation {
    createTransaction(
      createTransactionInput: CreateTransactionInput
    ): Transaction
    updateTransaction(
      updateTransactionInput: UpdateTransactionInput
    ): Transaction
  }
`
