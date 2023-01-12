import gql from 'graphql-tag'

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
    role: String
    promotions: [Promotion!]
    createdAt: Date
    updatedAt: Date
  }

  type Promotion {
    jobTitle: String
    baseSalary: Float
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
    role: String
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
    role: String
    promotion: PromotionInput
    updatedAt: Date
  }

  extend type Query {
    employee(id: ID): Employee
    employees: [Employee!]
  }

  extend type Mutation {
    createEmployee(createEmployeeInput: CreateEmployeeInput): Employee
    updateEmployee(updateEmployeeInput: UpdateEmployeeInput): Employee
  }
`
