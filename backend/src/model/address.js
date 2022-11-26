const mongoose = require('mongoose')
const geocoder = require('../utils/geocoder')

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
		locationId: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'Location'
		},
		villageId: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'Village'
		},
		addressType: {
			type: String,
			required: true,
			enum: [ 'home', 'work', 'friend' ],
			default: 'home'
		},
		dotcolor: {
			type: String,
			default: 'yellow'
		},
	},
	{
		timestamps: true
	}
)

module.exports = mongoose.model('Address', addressSchema)
