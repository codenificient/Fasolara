import { Document, model, Schema } from "mongoose";

export interface IEmployee extends Document {
  userId: string;
  accountID: string;
  teamId: string;
  salaryId: string;
  educationLevel: number;
  birthday: String;
  role: String;
  promotions: [
    {
      jobTitle: string;
      baseSalary: number;
      startDate: Date;
      endDate: Date;
    }
  ];
  createdBy: string;
  createdAt: Date;
  updatedAt: Date;
  _doc?: any;
  View(): IEmployee;
}

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
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

employeeSchema.methods = {
  View() {
    return {
      ...this._doc,
    };
  },
};

const Employee = model<IEmployee>("Employee", employeeSchema);
export default Employee;
