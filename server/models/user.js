const { model, Schema } = require("mongoose")

const userSchema = new Schema(
  {
    cnib: {
      type: String,
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

userSchema.method("fullName", function fullName() {
  if (this.midname)
    return this.firstName + " " + this.midname + " " + this.lastName
  return this.firstName + " " + this.lastName;
});

module.exports = model("User", userSchema)
