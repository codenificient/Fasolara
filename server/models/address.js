const { Schema, model } = require("mongoose")

const addressSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    locationId: {
      type: Schema.Types.ObjectId,
      ref: "Location",
    },
    villageId: {
      type: Schema.Types.ObjectId,
      ref: "Village",
    },
    addressType: {
      type: String,
      required: true,
      enum: ["home", "work", "friend", "office", "doctor", "hq", "branch"],
      default: "home",
    },
    address: {
      type: String,
      trim: true,
    },
    dotcolor: {
      type: String,
      default: "default",
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

module.exports = model("Address", addressSchema)
