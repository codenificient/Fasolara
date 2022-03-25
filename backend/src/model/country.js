const mongoose = require('mongoose')

const countrySchema = new mongoose.Schema(
	{
		name: String,
		population: {
			type: Number,
			default: 0
		},

	},
	{
		timestamps: true
	}
)

module.exports = mongoose.model('Country', countrySchema)
