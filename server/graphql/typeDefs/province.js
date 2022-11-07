const { gql } = require("apollo-server")

module.exports = gql`
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
    province: [Province!]
  }

  extend type Mutation {
    createProvince(createProvinceInput: CreateProvinceInput): Province
    updatProvince(updateProvinceInput: UpdateProvinceInput): Province
  }
`
