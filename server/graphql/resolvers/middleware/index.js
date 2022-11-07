const { ApolloError } = require("apollo-server-errors")
const { skip } = require("graphql-resolvers")

module.exports.isAuthenticated = (_, __, { email }) => {
  if (!email) {
    throw new ApolloError(
      "Access Denied! Please login to continue",
      "LOGIN_REQUIRED"
    )
  }
  return skip
}

module.exports.isPanelOwner = (_, __, {}) => {
  return
}