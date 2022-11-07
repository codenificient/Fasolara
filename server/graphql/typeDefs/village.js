const { gql } = require("apollo-server")

module.exports = gql`
  type Village {
    id: ID
    name: String
    population: Int
    provinceId: ID
    dotcolor: String
    urbanCommune: Boolean
    createdAt: Date
    updatedAt: Date
  }

  input CreateVillageInput {
    id: ID
    name: String
    population: Int
    provinceId: ID
    dotcolor: String
    urbanCommune: Boolean
    updatedAt: Date
  }

  input UpdateVillageInput {
    id: ID
    name: String
    population: Int
    provinceId: ID
    dotcolor: String
    urbanCommune: Boolean
    updatedAt: Date
  }

  extend type Query {
    village: Village
    getVillage(id: ID): Village
    villages: [Village!]
  }

  extend type Mutation {
    createVillage(createVillageInput: CreateVillageInput): Village
    updatVillage(updateVillageInput: UpdateVillageInput): Village
  }
`
