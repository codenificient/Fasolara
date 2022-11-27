const mongoose = require('mongoose')

const locationSchema = new mongoose.Schema(
	{
		locationId: {
			type: String,
			required: [ true, 'Please add a location ID' ],
			unique: true,
			trim: true
		},
		address: {
			type: String,
			required: [ true, 'Please provide a valid address' ]
		},
		location: {
			type: {
				type: String,
				enum: [ 'Point' ]
			},
			coordinates: {
				type: [ Number ],
				index: '2dsphere'
			},
			formattedAddress: String
		}
	},
	{
		timestamps: true
	}
)


module.exports = mongoose.model('Location', locationSchema)
