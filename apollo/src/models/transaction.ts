import { Schema, model } from "mongoose"

const transactionSchema = new Schema(
  {
    customerId: {
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

const Transaction = model("Transaction", transactionSchema)
export default Transaction