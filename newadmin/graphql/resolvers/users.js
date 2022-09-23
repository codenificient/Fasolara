const { ApolloError } = require( 'apollo-server' )
const User = require('../../models/User')
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")

module.exports = {
	Mutation: {
		async registerUser(_, {registerInput: {username, email, password}}) {
			// See if an old user exists with same email
			const oldUser = await User.findOne({email})

			if (oldUser) {
				throw new ApolloError('A user already exists with email' + email, 'USER_ALREADY_EXISTS')
			}
			// hash password
			const encryptedPass = await bcrypt.hash(password, 10)

			// Build mongoose model
			const newUser = new User({
				username,
				email: email.toLowerCase(),
				password: encryptedPass
			})

			// Generate a new token
			const token = jwt.sign(
				{user_id: newUser._id, email},
				"UNSAFE_STRING",
				{expiresIn: '7d'}
			)
			newUser.token = token
			// Save the user object
			const res = await newUser.save()

			return {
				id: res.id,
				...res._doc
			}
		}
	},
	Query: {

	}
}