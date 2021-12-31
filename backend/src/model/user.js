import mongoose from 'mongoose'

const userSchema = new mongoose.Schema(
	{
		cnib: {
			type: String,
			required: true
		}
	},
	{
		timestamps: true
	}
)

module.exports = mongoose.model('User', userSchema)
