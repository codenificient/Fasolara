const { gql } = require("apollo-server")

module.exports = gql`
  type Project {
    id: ID
    name: String
    addressId: ID
    branch: String
    createdAt: Date
    updatedAt: Date
  }

  input CreateProjectInput {
    id: ID
    name: String
    addressId: ID
    branch: String
    updatedAt: Date
  }

  input UpdateProjectInput {
    name: String
    addressId: ID
    branch: String
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
