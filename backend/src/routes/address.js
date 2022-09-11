const express = require('express')
const { getAddresses, addAddress } = require('../controllers/address')

const router = express.Router()

router.route('/v1/addresses').get(getAddresses).post(addAddress)

module.exports = router
