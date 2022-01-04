const mongoose = require('mongoose')

const accountSchema = new mongoose.Schema(
	{
		customerId: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'User'
		},
		loaningBankId: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'Bank'
		},
		balance : {
			type: Number,
			default: 0
		},
		debtAmount : {
			type: Number,
			default: 0
		},
		lifetimeEarning : {
			type: Number,
			default: 0
		},
		accountNumber: Number,
		solarGroup: String,
		carrier: String,
	},
	{
		timestamps: true
	}
)

module.exports = mongoose.model('Account', accountSchema)
