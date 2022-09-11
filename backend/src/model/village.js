const mongoose = require('mongoose')

const villageSchema = new mongoose.Schema(
	{
		name: {
			type: String,
			required: true,
			trim: true
		},
		population: {
			type: Number,
			required: true
		},
		dotcolor: {
			type: String,
			default: 'brown'
		},
		provinceId: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'Province'
		},
		urbanCommune: {
			type: Boolean,
			default: false
		}
	},
	{
		timestamps: true
	}
)

module.exports = mongoose.model('Village', villageSchema)
