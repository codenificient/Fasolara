import { Schema, model } from "mongoose"


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
  },
  { timestamps: true }
)

export const InvestorModel = model("Investor", investorSchema)
