const { gql } = require("apollo-server")

module.exports = gql`
  type Panel {
    id: ID
    accountId: ID
    serialNumber: String
    installCost: Float
    installDate: Date
    orderID: Date
    groupId: ID
    isActive: Boolean
    isInstalled: Boolean
    isReplacement: Boolean
    maintenanceDates: [Date]
    createdAt: Date
    updatedAt: Date
  }

  input CreatePanelInput {
    id: ID
    accountId: ID
    serialNumber: String
    installCost: Float
    installDate: Date
    orderID: Date
    groupId: ID
    isActive: Boolean
    isInstalled: Boolean
    isReplacement: Boolean
    maintenanceDate: Date
    updatedAt: Date
  }

  input UpdatePanelInput {
    accountId: ID
    serialNumber: String
    installCost: Float
    installDate: Date
    orderID: Date
    groupId: ID
    isActive: Boolean
    isInstalled: Boolean
    isReplacement: Boolean
    maintenanceDate: Date
    updatedAt: Date
  }

  extend type Query {
    panel: Panel
    getPanel(id: ID): Panel
    panels: [Panel!]
  }

  extend type Mutation {
    createPanel(createPanelInput: CreatePanelInput): Panel
    updatPanel(updatePanelInput: UpdatePanelInput): Panel
  }
`
