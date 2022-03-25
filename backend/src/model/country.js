const mongoose = require('mongoose')

const countrySchema = new mongoose.Schema(
	{
		employeeid: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'User'
		},
		amount: {
			type: Number,
			default: 0
		},
		startDate: String,
		endDate: String
	},
	{
		timestamps: true
	}
)

module.exports = mongoose.model('Country', countrySchema)
