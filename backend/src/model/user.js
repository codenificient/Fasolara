const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

const userSchema = new mongoose.Schema(
	{
		cnib: {
			type: String,
			required: true,
			trim: true
		},
		firstname: {
			type: String,
			required: true,
			trim: true
		},
		lastname: {
			type: String,
			required: true,
			trim: true
		},
		username: {
			type: String,
			required: true
		},
		email: {
			type: String,
			lowercase: true,
			required: true,
			trim: true,
			unique: true
		},
		dob: {
			type: Date,
			required: true
		},
		hash_password: {
			type: String,
			required: true
		},
		accountId: {
			type: String,
			trim: true
		},
		addressId: {
			type: String,
			trim: true
		},
		created: {
			type: Date,
			required: true
		}
	},
	{
		timestamps: true
	}
)

// userSchema.virtual('password').set(function(password) {
// 	this.hash_password = bcrypt.hashSync(password, 10);
// });

userSchema.virtual('fullname').get(function() {
	return `${this.firstname} ${this.lastname}`
})

userSchema.pre('save', async function(next) {
	if (this.password) {
		this.hash_password = await bcrypt.hash(this.password, 10)
	}
	next()
})

userSchema.methods = {
	authenticate: async function(password) {
		return await bcrypt.compare(password, this.hash_password)
	}
}

module.exports = mongoose.model('User', userSchema)
