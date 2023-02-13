import { Document, model, Schema } from "mongoose";

export interface IUser extends Document {
  _id: string;
  cnib: string;
  firstname: string;
  midname: string;
  lastname: string;
  username: string;
  mobileNumber: string;
  addressId: string;
  accountId: string;
  dob: Date;
  role: string;
  isActive: Boolean;
  email: string;
  password: string;
  token: string;
  avatar: string;
  resetToken: string;
  activationToken: string;
  teamId: string;
  createdAt: Date;
  updatedAt: Date;
  createdBy: string;
  _doc?: any;
  View(): IUser;
  fullName(): string;
}

const userSchema = new Schema(
  {
    cnib: {
      type: String,
      required: true,
      trim: true,
    },
    firstname: {
      type: String,
      required: true,
      trim: true,
    },
    midname: {
      type: String,
      trim: true,
    },
    lastname: {
      type: String,
      required: true,
      trim: true,
    },
    dob: Date,
    username: { type: String, default: null },
    email: { type: String, unique: true },
    password: {
      type: String,
    },
    avatar: {
      type: String,
      trim: true,
    },
    token: {
      type: String,
    },
    accountId: {
      type: Schema.Types.ObjectId,
      ref: "Account",
    },
    addressId: {
      type: Schema.Types.ObjectId,
      ref: "Address",
    },
    teamId: {
      type: Schema.Types.ObjectId,
      ref: "Team",
    },
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    mobileNumber: String,
    resetToken: String,
    activationToken: String,
    role: {
      type: String,
      default: "user",
      enum: [
        "admin",
        "employee",
        "manager",
        "investor",
        "supplier",
        "bank",
        "user",
      ],
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

userSchema.methods = {
  View() {
    return {
      ...this._doc,
    };
  },
  fullName() {
    if (this.midname) {
      return this.firstname + " " + this.midname + " " + this.lastname;
    }
    return this.firstname + " " + this.lastname;
  },
};

const User = model<IUser>("User", userSchema);
export default User;
