const { gql } = require("apollo-server");

module.exports = gql`
  """
  The Panel model stores granular information about panels used for business. Panel keeps track of its own rated capacity so we can see the evolution of panel health over time and determine useful life and projected output for future panels based on empirical data. Also based on location, rain, solar irridiation, maintenance schedule, etc. Main source of business intelligence
  """
  type Panel {
    id: ID
    serialNumber: String
    installCost: Float
    installDate: Date
    orderId: ID
    groupId: ID
    isActive: Boolean
    isInstalled: Boolean
    isReplacement: Boolean
    ratedCapacities: [Capacity]
    maintenanceDates: [Maintenance]
    createdAt: Date
    updatedAt: Date
  }

  type Maintenance {
    start: Date
    complete: Date
    comments: String
  }

  input MaintenanceInput {
    start: Date
    complete: Date
    comments: String
  }

  type Capacity {
    date: Date
    capacity: Float
  }

  input CapacityInput {
    date: Date
    capacity: Float
  }

  input CreatePanelInput {
    id: ID
    serialNumber: String
    installCost: Float
    installDate: Date
    orderID: Date
    groupId: ID
    isActive: Boolean
    isInstalled: Boolean
    isReplacement: Boolean
    maintenanceDate: MaintenanceInput
    updatedAt: Date
  }

  input AddCapacityInput {
    id: ID
    ratedCapacity: CapacityInput
  }

  input AddMaintenanceInput {
    id: ID
    maintenanceDate: MaintenanceInput
    maintenanceDates: [MaintenanceInput!]
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
    maintenanceDate: MaintenanceInput
    maintenanceDates: [MaintenanceInput]
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
    updatePanelMaintenance(addMaintenanceInput: AddMaintenanceInput): Panel
    updatePanelMaintenances(addMaintenanceInput: AddMaintenanceInput): Panel
  }
`;
