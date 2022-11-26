const { gql } = require("apollo-server");

module.exports = gql`
  """
  The Panel model stores granular information about panels used for business. Panel keeps track of its own rated capacity so we can see the evolution of panel health over time and determine useful life and projected output for future panels based on empirical data. Also based on location, rain, solar irridiation, maintenance schedule, etc. Main source of business intelligence
  """
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
    ratedCapacity: [Capacity]
    maintenanceDates: [Maintenance]
    createdAt: Date
    updatedAt: Date
  }

  type Maintenance {
    start: Date
    complete: Date
    comment: String
  }

  type Capacity {
    date: Date
    capacity: Float
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

  input AddCapacityInput {
    date: Date
    capacity: Float
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
    maintenanceDates: Maintenance
    updatedAt: Date
  }

  extend type Query {
    panel: Panel
    getPanel(id: ID): Panel
    panels: [Panel!]
  }

  extend type Mutation {
    createPanel(createPanelInput: CreatePanelInput): Panel
    updatePanel(updatePanelInput: UpdatePanelInput): Panel
    updatePanelCapacity(addCapacityInput: AddCapacityInput): Panel
  }
`;
