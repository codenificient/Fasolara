const { ApolloError } = require("apollo-server-errors")
const User = require("../../models/User")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")

module.exports = {
  Mutation: {
    async registerUser(_, { registerInput: { username, email, password } }) {
      // See if an old user exists with same email
      const oldUser = await User.findOne({ email })

      if (oldUser) {
        throw new ApolloError(
          "A user already exists with email" + email,
          "USER_ALREADY_EXISTS"
        )
      }
      // hash password
      const encryptedPass = await bcrypt.hash(password, 10)

      // Build mongoose model
      const newUser = new User({
        username,
        email: email.toLowerCase(),
        password: encryptedPass,
      })

      // Generate a new token
      const token = jwt.sign(
        { user_id: newUser._id, email },
        process.env.JWT_SECRET,
        {
          expiresIn: "7d",
        }
      )
      newUser.token = token
      // Save the user object
      const res = await newUser.save()

      return {
        id: res.id,
        ...res._doc,
      }
    },
    async loginUser(_, { loginInput: { email, password } }) {
      // See if this user exists
      const user = await User.findOne({ email })

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
    },
  },
  Query: {
    user: (_, { ID }) => User.findById(ID),
  },
}
