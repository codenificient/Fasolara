const mongoose = require('mongoose')

const countrySchema = new mongoose.Schema(
	{
		name: String,
		population: {
			type: Number,
			default: 0
		},
		continent: {
			type: String,
			default: 'Africa'
		},
		locationId: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'Location'
		},
		polycolor: {
			type: String,
			default: 'lightyellow'
		}
	},
	{
		timestamps: true
	}
)

module.exports = mongoose.model('Country', countrySchema)
