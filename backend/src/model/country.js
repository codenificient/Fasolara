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
		polycolor: {
			type: String,
			default: 'yellow'
		}
	},
	{
		timestamps: true
	}
)

module.exports = mongoose.model('Country', countrySchema)
