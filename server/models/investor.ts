import { Document, model, Schema } from "mongoose";

export interface IInvestor extends Document {
  role: string;
  userId: string;
  accountID: string;
  bonuses: [string];
  referrals: [string];
  startDate: Date;
  endDate: Date;
  createdBy: string;
  createdAt: Date;
  updatedAt: Date;
  _doc?: any;
  View(): IInvestor;
}

const investorSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    accountId: {
      type: Schema.Types.ObjectId,
      ref: "Account",
    },
    role: {
      type: String,
      default: "investor",
    },
    startDate: {
      type: Date,
      default: Date.now,
    },
    endDate: {
      type: Date,
    },
    referrals: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    bonuses: [
      {
        type: Schema.Types.ObjectId,
        ref: "Transaction",
      },
    ],
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

investorSchema.methods = {
  View() {
    return {
      ...this._doc,
    };
  },
};

const Investor = model<IInvestor>("Investor", investorSchema);
export default Investor;
