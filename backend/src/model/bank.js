const mongoose = require('mongoose')

const bankSchema = new mongoose.Schema(
	{
		name: {
			type: String,
			required: true,
			trim: true
		},
		addressId: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'Address'
		},
		branch: {
			type: String,
			required: true,
			trim: true
		},

	},
	{
		timestamps: true
	}
)

module.exports = mongoose.model('Bank', bankSchema)
