import { Document, model, Schema } from "mongoose"

export interface IUser extends Document
{
  _id: string
  cnib: String
  firstname: String
  midname: String
  lastname: String
  username: String
  fullName: String
  mobileNumber: String
  addressId: string
  accountId: string
  dob: Date
  role: String
  isActive: Boolean
  email: String
  password: String
  token: String
  avatar: String
  resetToken: String
  activationToken: String
  teamId: String
  createdAt: Date
  updatedAt: Date
  createdBy: String
  _doc?: any,
  View(): IUser
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
    username: { type: String, default: null },
    email: { type: String, unique: true },
    password: {
      type: String,
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
)

userSchema.methods = {
  View()
  {
    return {
      ...this._doc,
    }
  }
}

const User = model<IUser>( "User", userSchema )
export default User 