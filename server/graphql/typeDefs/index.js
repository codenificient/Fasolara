const { gql } = require("apollo-server")
const userTypes = require("./user")

const typeDefs = gql`
  scalar Date
  type Query {
    _: String
  }

  type Mutation {
    _: String
  }
`
module.exports = [typeDefs, userTypes]
