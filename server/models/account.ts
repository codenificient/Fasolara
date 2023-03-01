import {Document,  model, Schema } from "mongoose";

export interface IAccount extends Document {
  customerId: string;
  loaningBankId: string;
  balance: number;
  debtAmount: number;
  lifetimeEarning: number;
  accountNumber: string;
  solarGroupId: string;
  carrier: string;
  createdBy: string;
  createdAt: Date;
  updatedAt: Date;
  _doc?: any;
  View(): IAccount;
}

const accountSchema = new Schema(
  {
    customerId: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    loaningBankId: {
      type: Schema.Types.ObjectId,
      ref: "Bank",
    },
    balance: {
      type: Number,
      default: 0,
    },
    debtAmount: {
      type: Number,
      default: 0,
    },
    lifetimeEarning: {
      type: Number,
      default: 0,
    },
    accountNumber: String,
    solarGroupId: String,
    carrier: String,
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  },
  {
    timestamps: true,
  }
);

accountSchema.methods = {
  View() {
    return {
      ...this._doc,
    };
  },
};

const Account = model<IAccount>("Account", accountSchema);
export default Account;
