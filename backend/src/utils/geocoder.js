const NodeGeocoder = require("node-geocoder");

const options = {
  provider: "mapquest",

  // Optional depending on the providers
  apiKey: process.env.MAPBOX_KEY,
  formatter: null,
};

const geocoder = NodeGeocoder(options);

module.exports = geocoder;
