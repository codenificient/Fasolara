const { gql } = require("apollo-server")

module.exports = gql`
  type User {
    id: ID
    username: String
    email: String
    password: String
    token: String
    createdAt: Date
    updatedAt: Date
  }

  type Token {
    token: String
  }

  input RegisterInput {
    username: String
    email: String
    password: String
  }

  input LoginInput {
    email: String
    password: String
  }

  extend type Query {
    user: User
    users: [User!]
  }

  extend type Mutation {
    registerUser(registerInput: RegisterInput): User
    loginUser(loginInput: LoginInput): Token
  }
`
