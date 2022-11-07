const { gql } = require("apollo-server")

module.exports = gql`
  type Panel {
    id: ID
    name: String
    customerId: ID
    serialNumber: String
	installCost: Float
	installDate: Date
	orderID: Date
	groupId: ID
	isActive: Boolean
	isInstalled: Boolean
	isReplacement: Boolean
    createdAt: Date
    updatedAt: Date
  }

  input CreatePanelInput {
    id: ID
    name: String
    addressId: ID
    branch: String
    updatedAt: Date
  }

  input UpdatePanelInput {
    name: String
    addressId: ID
    branch: String
    updatedAt: Date
  }

  extend type Query {
    project: Panel
    getPanel(id: ID): Panel
    projects: [Panel!]
  }

  extend type Mutation {
    createPanel(createPanelInput: CreatePanelInput): Panel
    updatPanel(updatePanelInput: UpdatePanelInput): Panel
  }
`
