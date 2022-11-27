const mongoose = require("mongoose")

const transactionSchema = new mongoose.Schema(
  {
    customerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    accountId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Account",
    },
    amount: Number,
    memo: String,
    currency: {
      type: String,
      enum: ["usd", "eur", "xof", "cny", "rbs"],
      default: "xof",
    },
    tax: Number,
    taxRate: Number,
    status: {
      type: String,
      enum: ["started", "success", "cancelled", "failed", "archived", "active"],
      default: "started",
    },
    kind: {
      type: String,
      enum: [
        "dividend",
        "salary",
        "bonus",
        "gift",
        "purchase",
        "tax",
        "transfer",
        "deposit",
      ],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Transaction", transactionSchema)
