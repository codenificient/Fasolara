const mongoose = require('mongoose')

const bonusSchema = new mongoose.Schema(
	{
		customerId: String,
		accountNumber: Number,
		balance: Number,
		installDate: Date,
		solarGroup: String,
		debt: Number,
		lifetimeEarning: Number
	},
	{
		timestamps: true
	}
)

module.exports = mongoose.model('Bonus', bonusSchema)
