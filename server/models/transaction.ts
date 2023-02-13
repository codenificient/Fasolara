import { Document, model, Schema } from "mongoose";

export interface ITransaction extends Document {
  customerId: string;
  accountId: string;
  beneficiaryId: string;
  amount: number;
  tax: number;
  taxRate: number;
  currency: string;
  memo: string;
  status: string;
  kind: string;
  createdBy: string;
  createdAt: Date;
  updatedAt: Date;
  _doc?: any;
  View(): ITransaction;
}

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
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  },
  {
    timestamps: true,
  }
);

transactionSchema.methods = {
  View() {
    return {
      ...this._doc,
    };
  },
};

const Transaction = model<ITransaction>("Transaction", transactionSchema);
export default Transaction;
