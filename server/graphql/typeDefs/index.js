const { gql } = require("apollo-server")
const userTypes = require("./user")
const accountTypes = require("./account")

const typeDefs = gql`
  scalar Date
  type Query {
    _: String
  }

  type Mutation {
    _: String
  }
`
module.exports = [accountTypes, typeDefs, userTypes]
