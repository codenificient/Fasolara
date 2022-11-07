const { gql } = require("apollo-server")

module.exports = gql`
  type Project {
    id: ID
    name: String
    zone: String
    dotcolor: String
    addressId: ID
    branch: String
    impact: Float
    suppliers: [Supplier]
    supplierId: ID
    isComplete: Boolean
    isActive: Boolean
    createdAt: Date
    updatedAt: Date
  }

  type Supplier {
    supplierId: ID
    hiringDate: Date
  }

  input CreateProjectInput {
    id: ID
    name: String
    zone: String
    dotcolor: String
    addressId: ID
    branch: String
    impact: Float
    supplierIds: [Supplier]
    supplierId: ID
    isComplete: Boolean
    isActive: Boolean
    createdAt: Date
    updatedAt: Date
  }

  input UpdateProjectInput {
    name: String
    zone: String
    dotcolor: String
    addressId: ID
    branch: String
    impact: Float
    supplierId: ID
    suppliers: [Supplier]
    isComplete: Boolean
    isActive: Boolean
    createdAt: Date
    updatedAt: Date
  }

  extend type Query {
    project: Project
    getProject(id: ID): Project
    projects: [Project!]
  }

  extend type Mutation {
    createProject(createProjectInput: CreateProjectInput): Project
    updatProject(updateProjectInput: UpdateProjectInput): Project
  }
`
