import { Schema, model } from "mongoose"

const provinceSchema = new Schema(
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
      type: Schema.Types.ObjectId,
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

const Province = model("Province", provinceSchema)
export default Province