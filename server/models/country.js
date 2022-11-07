const { Schema, model } = require("mongoose")

const countrySchema = new Schema(
  {
    name: String,
    population: {
      type: Number,
      default: 0,
    },
    continent: {
      type: String,
      default: "Africa",
    },
    locationId: {
      type: Schema.Types.ObjectId,
      ref: "Location",
    },
    polycolor: {
      type: String,
      default: "yellow",
    },
  },
  {
    timestamps: true,
  }
)

module.exports = model("Country", countrySchema)
