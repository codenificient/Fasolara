const userResolvers = require("./user")
const accountResolvers = require("./account")
const addressResolvers = require("./address")
const { GraphQLDateTime } = require("graphql-iso-date")

const customScalarResolver = {
  Date: GraphQLDateTime,
}

module.exports = [
  accountResolvers,
  addressResolvers,
  customScalarResolver,
  userResolvers,
]
