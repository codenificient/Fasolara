import { Document, model, Schema } from "mongoose";

export interface ITransaction extends Document {
  senderId: string;
  receiverId: string;
  srcAccountId: string;
  destAccountId: string;
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
    senderId: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    receiverId: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    srcAccountId: {
      type: Schema.Types.ObjectId,
      ref: "Account",
    },
    destAccountId: {
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
