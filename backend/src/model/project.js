const mongoose = require( 'mongoose')

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
		population: {
			type: Number,
			required: true
		},
		dotcolor: {
			type: String,
			required: true
		},
		provinceId: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "Province"
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
