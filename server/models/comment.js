const { Schema, model } = require("mongoose");

const commentSchema = new Schema(
  {
    userId: { type: Schema.ObjectId, ref: "User" },
    content: {
      type: String,
      required: true,
      trim: true,
    },
    isActive: { type: Boolean, default: true },
    isDisabled: { type: Boolean, default: false },
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

module.exports = model("Comment", commentSchema);
