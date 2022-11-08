const { gql } = require("apollo-server")

module.exports = gql`
  """
  The Account model stores a lot of necessary information to support Lara transactions
  """
  type Account {
    id: ID
    balance: Float
    debtAmount: Float!
    lifetimeEarning: Float
    accountNumber: String
    solarGroup: ID!
    carrier: String
    customerId: ID!
    loaningBankId: ID!
    createdAt: Date
    updatedAt: Date
    customer: User
  }

  input CreateAccountInput {
    balance: Float
    debtAmount: Float
    lifetimeEarning: Float
    accountNumber: String
    solarGroup: ID
    carrier: String
    customerId: ID
    loaningBankId: ID
  }

  input UpdateAccountInput {
    balance: Float
    debtAmount: Float
    lifetimeEarning: Float
    accountNumber: String
    solarGroup: ID
    carrier: String
    customerId: ID
    loaningBankId: ID
  }

  extend type Query {
    account: Account
    getAccount(id: ID): Account
    accounts: [Account!]
  }

  extend type Mutation {
    createAccount(createAccountInput: CreateAccountInput): Account
    updateAccount(updateAccountInput: UpdateAccountInput): Account
  }
`
