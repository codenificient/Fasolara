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
			required: true,
			default: 'default'
		},
		impact: {
			type: Number,
			default: 0
		},
		addressId: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'Address'
		},
		suppliers: [
			{
				supplier: {
					type: mongoose.Schema.Types.ObjectId,
					ref: 'Supplier'
				},
				hiringDate: {
					type: Date,
					
				}
			}
		],
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
