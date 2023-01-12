import { Schema, model } from "mongoose"

const employeeSchema = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, ref: "User" },
    accountID: { type: Schema.Types.ObjectId, ref: "Account" },
    teamId: { type: Schema.Types.ObjectId, ref: "Team" },
    salaryIds: [{ type: Schema.Types.ObjectId, ref: "Salary" }],
    educationLevel: {
      type: Number,
      default: 3,
      enum: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11],
    },
    role: {
      type: String,
      default: "employee",
      enum: ["admin", "employee", "manager"],
    },
    birthday: String,
    mobileNumber: String,
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

const Employee = model("Employee", employeeSchema)
export default Employee