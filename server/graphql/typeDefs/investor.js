const { gql } = require("apollo-server")

module.exports = gql`
  """
  The Investor model inherits from base User model and adds investment startDate as well as referrals and bonuses
  """
  type Investor {
    id: ID
    role: String
    userId: ID
    accountId: ID
    bonuses: [ID]
    referrals: [ID]
    startDate: Date
    endDate: Date
    createdAt: Date
    updatedAt: Date
  }

  input CreateInvestorInput {
    id: ID
    startDate: Date
    endDate: Date
    userId: ID
    accountId: ID
    teamId: ID
    bonuses: [ID]
    referrals: [ID]
    updatedAt: Date
  }

  input UpdateInvestorInput {
    id: ID
    startDate: Date
    endDate: Date
    userId: ID
    accountId: ID
    teamId: ID
    role: String
    bonuses: [ID]
    referrals: [ID]
    updatedAt: Date
  }

  extend type Query {
    investor: Investor
    getInvestor(id: ID): Investor
    investors: [Investor!]
  }

  extend type Mutation {
    createInvestor(createInvestorInput: CreateInvestorInput): Investor
    updateInvestor(updateInvestorInput: UpdateInvestorInput): Investor
  }
`;
