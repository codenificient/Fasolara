import { Document, model, Schema } from "mongoose"

export interface IComment extends Document
{
  userId: string
  index: string
  content: string
  isDisabled: boolean
  isActive: boolean
  _doc?: any,
  View(): IComment
}

const commentSchema = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, ref: "User" },
    index: { type: Number, default: 0 },
    content: String,
    isDisabled: { type: Boolean, default: false },
  },
  { timestamps: true }
)

commentSchema.methods = {
  View()
  {
    return {
      ...this._doc,
    }
  }
}

const Comment = model<IComment>( "Comment", commentSchema )
export default Comment