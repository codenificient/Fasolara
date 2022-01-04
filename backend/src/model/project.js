const mongoose = require('mongoose')

const projectSchema = new mongoose.Schema(
	{
		name: {
			type: String,
			required: true,
			trim: true
		},
		zone: {
			type: String,
			required: true
		},
		dotcolor: {
			type: String,
			required: true
		},
		impact: {
			type: Number,
			default: 0
		},
		addressId: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'Address'
		},
		suppliers: {
			type: [supplierSchema],
			required: true
		},
		created: {
			type: Date,
			required: true
		}
	},
	{
		timestamps: true
	}
)

module.exports = mongoose.model('Project', projectSchema)
