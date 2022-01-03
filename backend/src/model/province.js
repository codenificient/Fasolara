const mongoose = require('mongoose')

const provinceSchema = new mongoose.Schema(
	{
		region: {
			type: String,
			required: true,
			trim: true
		},
		name: {
			type: String,
			required: true,
			trim: true
		},
		seat: {
			type: String,
			required: true,
			trim: true
		},
		polycolor: {
			type: String,
			default: 'beige'
		},
		created: {
			type: Date,
			required: true
		},
		zone: {
			type: String,
			enum: ["sahelienne", "soudanaise", "subsoudainaise"]
		}
	},
	{
		timestamps: true
	}
)

module.exports = mongoose.model('Province', provinceSchema)
