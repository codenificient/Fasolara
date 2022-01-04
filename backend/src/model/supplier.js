const mongoose = require('mongoose')

const supplierSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true
	},
	accountId: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Account'
	},
	addressId: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Address'
	},
})

module.exports = mongoose.model('Supplier', supplierSchema)