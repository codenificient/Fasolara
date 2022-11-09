const { Schema, model } = require("mongoose")
const extendSchema = require("../helpers/context")
const userSchema = require("./user")

const investorSchema = extendSchema(userSchema, {
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
})

module.exports = model("Investor", investorSchema)
