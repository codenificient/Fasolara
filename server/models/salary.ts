import {Document, model, Schema } from "mongoose";

export interface ISalary extends Document {
  userId: string;
  amount: number;
  jobTitle: string;
  startDate: Date;
  endDate: Date;
  createdBy: string;
  createdAt: Date;
  updatedAt: Date;
  _doc?: any;
  View(): ISalary;
}

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

salarySchema.methods = {
  View() {
    return {
      ...this._doc,
    };
  },
};

const Salary = model<ISalary>("Salary", salarySchema);
export default Salary;
