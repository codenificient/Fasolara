const { Schema, model } = require("mongoose")

const orderSchema = new Schema(
  {
    orderDate: {
      type: Date,
      default: Date.now,
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    supplierId: {
      type: Schema.Types.ObjectId,
      ref: "Supplier",
    },
    quantity: {
      type: Number,
      default: 1,
    },
    purchaseCost: {
      type: Number,
      default: 1,
    },
    currency: {
      type: String,
      default: "cfa",
      enum: ["cfa", "usd", "cad", "aud", "cny", "rub"],
    },
  },
  {
    timestamps: true,
  }
)

module.exports = model("Order", orderSchema)
