const NodeGeocoder = require('node-geocoder')

const options = {
	provider: 'mapquest',

	// Optional depending on the providers
	apiKey: 'MtyHEsGsEC3tr7QgA79AnEkGOvOEVTPj',
	formatter: null
}

const geocoder = NodeGeocoder(options)

module.exports = geocoder