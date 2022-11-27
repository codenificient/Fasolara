const { Schema, model } = require("mongoose");

const commentSchema = new Schema(
  {
    user: { type: Schema.ObjectId, ref: "User" },
    index: { type: Number, default: 0 },
    content: String,
    isDisabled: { type: Boolean, default: false },
  },
  { timestamps: true }
);

module.exports = model("Comment", commentSchema);
