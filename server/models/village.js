const { Schema, model } = require("mongoose")

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
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = model("Village", villageSchema)
