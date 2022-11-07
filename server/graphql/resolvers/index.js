const userResolvers = require("./user")
const {
  GraphQLDate,
  GraphQLTime,
  GraphQLDateTime,
} = require("graphql-iso-date")

const customScalarResolver = {
  Date: GraphQLDateTime,
}

module.exports = [customScalarResolver, userResolvers]
