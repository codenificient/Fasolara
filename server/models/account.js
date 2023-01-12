const { Schema, model } = require("mongoose");

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
    solarGroup: String,
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

module.exports = model("Account", accountSchema);
