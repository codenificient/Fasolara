const mongoose = require('mongoose')

const addressSchema = new mongoose.Schema(
	{
		name: {
			type: String,
			required: true,
			trim: true
		},
		mobileNumber: {
			type: String,
			required: true,
			trim: true
		},
		streetAddress: {
			type: String,
			required: true,
			trim: true
		},
		city: {
			type: String,
			required: true,
			trim: true
		},
		villageId: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'Village'
		},
		postalCode: {
			type: String,
			required: true,
			trim: true,
			min: 5
		},
		addressType: {
			type: String,
			required: true,
			enum: [ 'home', 'work', 'friend' ],
			default: 'home'
		},
		dotcolor: {
			type: String,
			default: 'default'
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

module.exports = mongoose.model('Address', addressSchema)
