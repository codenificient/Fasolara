const { gql } = require("apollo-server")

module.exports = gql`
  """
  The Province model is a necessary component of Location services for projects. Refactored so we can draw polygon on a map
  """
  type Province {
    id: ID
    name: String
    region: String
    seat: String
    polycolor: String
    zone: String
    countryId: ID
    createdAt: Date
    updatedAt: Date
  }

  input CreateProvinceInput {
    id: ID
    name: String
    region: String
    seat: String
    polycolor: String
    zone: String
    countryId: ID
  }

  input UpdateProvinceInput {
    id: ID
    name: String
    region: String
    seat: String
    polycolor: String
    zone: String
    countryId: ID
    updatedAt: Date
  }

  extend type Query {
    province: Province
    getProvince(id: ID): Province
    provinces: [Province!]
  }

  extend type Mutation {
    createProvince(createProvinceInput: CreateProvinceInput): Province
    updateProvince(updateProvinceInput: UpdateProvinceInput): Province
  }
`
