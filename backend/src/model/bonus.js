const mongoose = require('mongoose')

const bonusSchema = new mongoose.Schema(
	{
		customerId: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'User'
		},
		accountId: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'Account'
		},
		amount: Number,
		Reason: String,
		tax: Number,
		taxRate: Number
	},
	{
		timestamps: true
	}
)

module.exports = mongoose.model('Bonus', bonusSchema)
