import gql from 'graphql-tag'

module.exports = gql`
  """
  The Country model stores some countries of interest for business purposes. Can use this to draw maps and poligons in frontend
  """
  type Country {
    id: ID
    name: String
    population: ID
    continent: String
    polycolor: String
    locationId: ID
    createdAt: Date
    updatedAt: Date
  }

  input CreateCountryInput {
    id: ID
    name: String
    population: ID
    continent: String
    locationId: ID
    polycolor: String
    updatedAt: Date
  }

  input UpdateCountryInput {
    name: String
    population: ID
    continent: String
    locationId: ID
    polycolor: String
    updatedAt: Date
  }

  extend type Query {
    country(id: ID): Country
    countries: [Country!]
  }

  extend type Mutation {
    createCountry(createCountryInput: CreateCountryInput): Country
    updateCountry(updateCountryInput: UpdateCountryInput): Country
  }
`
