const mongoose = require("mongoose")

const salarySchema = new mongoose.Schema(
  {
    employeeId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    amount: {
      type: Number,
      default: 0,
    },
    jobTitle: String,
    startDate: String,
    endDate: String,
  },
  {
    timestamps: true,
  }
)

module.exports = mongoose.model("Salary", salarySchema)
