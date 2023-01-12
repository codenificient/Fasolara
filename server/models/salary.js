const { Schema, model } = require("mongoose");

const salarySchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    amount: {
      type: Number,
      default: 0,
    },
    jobTitle: String,
    startDate: {
      type: Date,
      default: Date.now,
    },
    endDate: Date,
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = model("Salary", salarySchema);
