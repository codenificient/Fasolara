const userResolvers = require("./user")
const accountResolvers = require("./account")
const { GraphQLDateTime } = require("graphql-iso-date")

const customScalarResolver = {
  Date: GraphQLDateTime,
}

module.exports = [accountResolvers, customScalarResolver, userResolvers]
