import { Schema, model } from "mongoose"


const orderSchema = new Schema(
  {
    orderDate: {
      type: Date,
      default: Date.now,
    },
    deliveryDate: {
      type: Date,
      default: Date.now,
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    deliveryUserId: {
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
    finalCost: {
      type: Number,
      default: 0,
    },
    finalCurrency: {
      type: String,
      default: "usd",
    },
    status: {
      type: String,
      default: "submitted",
      enum: [
        "pending",
        "awaiting payment",
        "awaiting fulfillment",
        "awaiting shipment",
        "awaiting pickup",
        "partially shipped",
        "shipped",
        "completed",
        "delivered",
        "cancelled",
        "declined",
        "refunded",
        "disputed",
        "partially refunded",
        "Manual Verification Required",
      ],
    },
  },
  {
    timestamps: true,
  }
)

const Order = model("Order", orderSchema)
export default Order