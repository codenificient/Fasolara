const { Schema, model } = require("mongoose");

const transactionSchema = new Schema(
  {
    customerId: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    beneficiaryId: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    accountId: {
      type: Schema.Types.ObjectId,
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
      enum: [
        "initiated",
        "success",
        "cancelled",
        "failed",
        "archived",
        "active",
      ],
      default: "initiated",
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
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = model("Transaction", transactionSchema);
