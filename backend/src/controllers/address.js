const Address = require('../model/address')

/**
 * @desc Get all addresses
 * @route GET /api/v1/addresses
 * @access Public
 */
exports.getAddresses = async (req, res, next) => {
	try {
		const addressses = await Address.find()

		return res.status(200).json({
			success: true,
			count: addressses.length,
			data: addressses
		})
	} catch (err) {
		console.error(err)
		res.status(500).json({ error: 'Server error' })
	}
}

/**
 * @desc Add a new Address
 * @route POST /api/v1/addresses
 * @access Private
 */
exports.addAddress = async (req, res, next) => {
	try {
		const address = await Address.create(req.body)

		return res.status(200).json({
			success: true,
			data: address
		})
	} catch (err) {
		console.error(err)
		if (err.code === 11000) {
			return res.status(400).json({ error: 'This is a duplicate Address' })
		}
		res.status(500).json({ error: 'Server error' })
	}
}
