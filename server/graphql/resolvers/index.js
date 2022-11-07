const userResolvers = require("./user")
const { GraphQLDateTime } = require("graphql-iso-date")

const customScalarResolver = {
  Date: GraphQLDateTime,
}

module.exports = [customScalarResolver, userResolvers]
