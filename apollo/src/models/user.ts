import { Schema, model } from "mongoose"

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

const User = model("User", userSchema)
export default User 