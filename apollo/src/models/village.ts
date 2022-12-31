import { Schema, model } from "mongoose"

const villageSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    population: {
      type: Number,
      required: true,
    },
    dotcolor: {
      type: String,
      default: "brown",
    },
    provinceId: {
      type: Schema.Types.ObjectId,
      ref: "Province",
    },
    urbanCommune: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
)

export const VillageModel = model("Village", villageSchema)
