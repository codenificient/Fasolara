import { Schema, model } from "mongoose"

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
  },
  {
    timestamps: true,
  }
)

const Salary = model("Salary", salarySchema)
export default Salary