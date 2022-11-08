const { gql } = require("apollo-server")

module.exports = gql`
  """
  The Salary model tracks employee Salaries for easier computations and aggregate data operations
  """
  type Salary {
    id: ID
    userId: ID
    amount: Float!
    jobTitle: String
    startDate: Date
    endDate: Date
    createdAt: Date
    updatedAt: Date
  }

  input CreateSalaryInput {
    id: ID
    userId: ID
    amount: Float!
    jobTitle: String
    startDate: Date
    endDate: Date
    updatedAt: Date
  }

  input UpdateSalaryInput {
    id: ID
    userId: ID
    amount: Float!
    jobTitle: String
    startDate: Date
    endDate: Date
    updatedAt: Date
  }

  extend type Query {
    salary: Salary
    getSalary(id: ID): Salary
    salaries: [Salary!]
  }

  extend type Mutation {
    createSalary(createSalaryInput: CreateSalaryInput): Salary
    updatSalary(updateSalaryInput: UpdateSalaryInput): Salary
  }
`
