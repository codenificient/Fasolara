const mongoose = require('mongoose')

const supplierSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true
	},
	accountId: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Account'
	}
})

const projectSchema = new mongoose.Schema(
	{
		// geo: {
		// 	type: String,
		// 	required: true,
		// 	trim: true
		// },
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
		villageId: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'Village'
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
