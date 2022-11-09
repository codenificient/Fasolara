const { gql } = require("apollo-server")

module.exports = gql`
  """
  The Employee model is a superset of user for partners employeed at the company. Education, promotions, salary info
  """
  type Employee {
    id: ID
    userId: ID
    accountID: ID
    teamId: ID
    salaryId: ID
    educationLevel: Int
    birthday: String
    promotions: [Promotion!]
    createdAt: Date
    updatedAt: Date
  }

  type Promotion {
    jobTitle: String
    startDate: Date
    endDate: Date
  }

  input PromotionInput {
    jobTitle: String
    startDate: Date
    endDate: Date
  }

  input CreateEmployeeInput {
    id: ID
    userId: String
    accountID: ID
    teamId: ID
    salaryId: ID
    educationLevel: Int
    birthday: String
    promotion: PromotionInput
    updatedAt: Date
  }

  input UpdateEmployeeInput {
    id: ID
    userId: String
    accountID: ID
    teamId: ID
    salaryId: ID
    educationLevel: Int
    birthday: String
    promotion: PromotionInput
    updatedAt: Date
  }

  extend type Query {
    employee: Employee
    getEmployee(id: ID): Employee
    employees: [Employee!]
  }

  extend type Mutation {
    createEmployee(createEmployeeInput: CreateEmployeeInput): Employee
    updatEmployee(updateEmployeeInput: UpdateEmployeeInput): Employee
  }
`
