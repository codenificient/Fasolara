const { Schema, model } = require("mongoose")

const bankSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    addressId: {
      type: Schema.Types.ObjectId,
      ref: "Address",
    },
    branch: {
      type: String,
      required: true,
      trim: true,
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

module.exports = model("Bank", bankSchema)
