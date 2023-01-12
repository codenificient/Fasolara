const { gql } = require("apollo-server");

module.exports = gql`
  """
  The User model stores a lot of user information to support Lara operations. Considering the need of a separate server to store PII for privacy purposes. Can locally store unique ID, token and the remainder offsite
  """
  type User {
    id: ID
    cnib: String
    firstname: String
    midname: String
    lastname: String
    username: String
    fullName: String
    mobileNumber: String
    addressId: ID
    accountId: ID
    dob: Date
    role: String
    isActive: Boolean
    email: String
    password: String
    token: String
    avatar: String
    resetToken: String
    activationToken: String
    createdAt: Date
    updatedAt: Date
    createdBy: String
  }

  type Token {
    token: String
  }

  input RegisterInput {
    username: String
    email: String!
    password: String!
    mobileNumber: String
    addressId: ID
    accountId: ID
    cnib: String
    firstname: String!
    midname: String
    lastname: String!
    dob: Date
    role: String
    token: String
    avatar: String
    resetToken: String
    activationToken: String
    createdBy: String
  }

  input UpdateUserInput {
    username: String
    email: String!
    password: String!
    addressId: ID
    accountId: ID
    cnib: String
    firstname: String!
    midname: String
    lastname: String!
    dob: Date
    role: String
    resetToken: String
    activationToken: String
    avatar: String
    createdBy: String
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
    updateUser(updateUserInput: UpdateUserInput): User
    loginUser(loginInput: LoginInput): Token
  }
`;
