const { gql } = require("apollo-server")

module.exports = gql`
  type Country {
    id: ID
    name: String
    population: ID
    continent: String
	polycolor: String
    createdAt: Date
    updatedAt: Date
  }

  input CreateCountryInput {
    id: ID
    name: String
    addressId: ID
    branch: String
    updatedAt: Date
  }

  input UpdateCountryInput {
    name: String
    addressId: ID
    branch: String
    updatedAt: Date
  }

  extend type Query {
    country: Country
    getCountry(id: ID): Country
    country: [Country!]
  }

  extend type Mutation {
    createCountry(createCountryInput: CreateCountryInput): Country
    updatCountry(updateCountryInput: UpdateCountryInput): Country
  }
`
