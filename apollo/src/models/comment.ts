import { Schema, model } from "mongoose"


const commentSchema = new Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: "User" },
    index: { type: Number, default: 0 },
    content: String,
    isDisabled: { type: Boolean, default: false },
  },
  { timestamps: true }
);

const Comment = model("Comment", commentSchema);
export default Comment