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
        const newAccount = new User({
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
    updateAccount: async (_, { loginInput: { email, password } }) => {
      try {
        // See if this user exists
        const user = await User.findOne({ email })
        if (!user) {
          throw new ApolloError("User not found", "USER_NOT_FOUND")
        }
        // check correct password
        if (user && (await bcrypt.compare(password, user.password))) {
          const token = jwt.sign(
            { user_id: user._id, email },
            process.env.JWT_SECRET,
            {
              expiresIn: "7d",
            }
          )
          // create a new token and attach
          user.token = token

          // return found user
          return {
            id: user.id,
            ...user._doc,
          }
        } else {
          // Return incorrect password
          throw new ApolloError(
            "Email or password is incorrect",
            "INCORRECT_PASSWORD"
          )
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
