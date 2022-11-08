const { Schema, model } = require("mongoose")

const employeeSchema = new Schema(
  {
    userId: { type: Schema.ObjectId, ref: "User" },
    accountID: { type: Schema.ObjectId, ref: "Account" },
    teamId: { type: Schema.ObjectId, ref: "Team" },
    salaryId: { type: Schema.ObjectId, ref: "Salary" },
    educationLevel: {
      type: Number,
      default: 3,
      enum: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11],
    },
    birthday: String,
    mobileNumber
    promotions: [
      {
        jobTitle: String,
        startDate: {
          type: Date,
          default: Date.now,
        },
        endDate: Date,
      },
    ],
  },
  { timestamps: true }
)

module.exports = model("Employee", employeeSchema)
