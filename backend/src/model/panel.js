const mongoose = require('mongoose')

const panelSchema = new mongoose.Schema(
	{
		customerId: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'Account'
		},
		serialNumber: String,
		installCost: Number,
		installDate: Date,
		isReplacement: Boolean,
		isActive: Boolean,
		groupId: String
	},
	{
		timestamps: true
	}
)

module.exports = mongoose.model('Panel', panelSchema)
