const { gql } = require("apollo-server")

module.exports = gql`
  type User {
	id: ID
    username: String
    email: String
    password: String
    token: Token
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
    user(id: ID!): User
    users: [User!]
  }

  extend type Mutation {
    registerUser(registerInput: RegisterInput): User
    loginUser(loginInput: LoginInput): Token
  }
`
