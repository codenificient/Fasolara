const { gql } = require("apollo-server");

module.exports = gql`
  """
  The Project model stores information to track various business activities. Everything is a project, for management purposes
  """
  type Project {
    id: ID
    name: String
    zone: String
    dotcolor: String
    addressId: ID
    managerId: ID
    teamIds: [TeamId]
    branch: String
    impact: Float
    suppliers: [Supplier]
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
    supplierId: ID
    teamIds: [ID!]
    isComplete: Boolean
    isActive: Boolean
    createdAt: Date
    updatedAt: Date
  }

  type TeamId {
    teamId: ID
  }

  input TeamIdInput {
    teamId: ID
  }

  input UpdateProjectInput {
    name: String
    zone: String
    dotcolor: String
    addressId: ID
    branch: String
    impact: Float
    supplierId: ID
    teamId: ID
    teamIds: [ID!]
    isComplete: Boolean
    isActive: Boolean
    createdAt: Date
    updatedAt: Date
  }

  input SupplierInput {
    supplierId: ID
    hiringDate: Date
  }

  input AddSupplierInput {
    id: ID
    supplier: SupplierInput
    suppliers: [SupplierInput!]
  }

  input AddTeamInput {
    id: ID
    teamId: TeamIdInput
    teamIds: [TeamIdInput!]
  }

  extend type Query {
    project: [Project]
    getProject(id: ID): Project
    projects: [Project!]
  }

  extend type Mutation {
    createProject(createProjectInput: CreateProjectInput): Project
    updateProject(updateProjectInput: UpdateProjectInput): Project
    updateProjectSupplier(addSupplierInput: AddSupplierInput): Project
    updateProjectSuppliers(addSupplierInput: AddSupplierInput): Project
    updateProjectTeam(addTeamInput: AddTeamInput): Project
    updateProjectTeams(addTeamInput: AddTeamInput): Project
  }
`;
