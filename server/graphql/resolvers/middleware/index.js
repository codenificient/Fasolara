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

module.exports.canModifyData = (parent, __, { role }) => {
  if (parent.createdBy !== userId || role !== "admin" || role !== "manager") {
    throw new ApolloError(
      "Not authorized to Edit as Owner",
      "UNAUTHORIZED_EDIT"
    )
  }
  return skip
}
