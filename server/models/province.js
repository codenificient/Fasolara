const mongoose = require("mongoose")

const provinceSchema = new mongoose.Schema(
  {
    region: {
      type: String,
      required: true,
      trim: true,
    },
    name: {
      type: String,
      required: true,
      trim: true,
    },
    seat: {
      type: String,
      required: true,
      trim: true,
    },
    countryId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Country",
    },
    polycolor: {
      type: String,
      default: "beige",
    },
    zone: {
      type: String,
      enum: ["sahelienne", "soudanaise", "subsoudainaise"], // add more
    },
  },
  {
    timestamps: true,
  }
)

module.exports = mongoose.model("Province", provinceSchema)
