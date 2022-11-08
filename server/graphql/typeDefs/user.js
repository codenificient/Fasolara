const { gql } = require("apollo-server")

module.exports = gql`
  type User {
    id: ID
    cnib: String
    firstname: String
    midname: String
    lastname: String
    username: String
    mobileNumber: String
    dob: String
    role: String
    isActive: Boolean
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
    email: String!
    password: String!
    cnib: String
    firstname: String!
    midname: String
    lastname: String!
    dob: String
    role: String
  }

  input LoginInput {
    email: String
    password: String
  }

  extend type Query {
    user: User
    getUser(id: ID): User
    users: [User!]
  }

  extend type Mutation {
    registerUser(registerInput: RegisterInput): User
    loginUser(loginInput: LoginInput): Token
  }
`
