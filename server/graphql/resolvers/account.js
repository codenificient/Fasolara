const { ApolloError } = require("apollo-server-errors")
const Account = require("../../models/account")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const { combineResolvers } = require("graphql-resolvers")
const { isAuthenticated } = require("./middleware")

module.exports = {
  Mutation: {
    createAccount: async (_, { createAccountInput: { accountNumber } }) => {
      try {
        // See if an old user exists with same email
        const oldAccount = await Account.findOne({ accountNumber })

        if (oldAccount) {
          throw new ApolloError(
            "An account already exists with number" + accountNumber,
            "USER_ALREADY_EXISTS"
          )
        }

        // Build mongoose model
        const newAccount = new Account({
          ...createAccountInput,
        })

        // Save the user object
        const res = await newAccount.save()

        return {
          id: res.id,
          ...res._doc,
        }
      } catch (error) {
        console.log(error)
        throw error
      }
    },
  },
  Query: {
    account: combineResolvers(isAuthenticated, async (_, __, { userId }) => {
      try {
        const account = await Account.findOne({ customerId: userId })
        if (!account) {
          throw new ApolloError("Account not found", "ACCOUNT_NOT_FOUND")
        }
        return account
      } catch (error) {
        console.log(error)
        throw error
      }
    }),
    accounts: async () => await Account.find({}),
  },
}
