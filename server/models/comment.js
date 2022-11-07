const { Schema, model } = require("mongoose")

const commentSchema = new Schema({
  user: { type: Schema.ObjectId, ref: "User" },
  index: { type: Number, default: 0 },
  content: String,
  created: { type: Date, default: Date.now },
  is_removed: { type: Boolean, default: false },
})

module.exports = model("Comment", commentSchema)