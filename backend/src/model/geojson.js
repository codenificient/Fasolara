const mongoose = require('mongoose')
const geocoder = require('../utils/geocoder')

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

// Geocode and create a location
locationSchema.pre('save', async function(next) {
	const loc = await geocoder.geocode(this.address)
	this.location = {
		type: 'Point',
		coordinates: [ loc[0].longitude, loc[0].latitude ],
		formattedAddress: loc[0].formattedAddress
	}
	// do not save address into mongo
	this.address = undefined
	next()
})

module.exports = mongoose.model('Location', locationSchema)
