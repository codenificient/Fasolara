import { Document, model, Schema } from "mongoose";

export interface IActivity extends Document {
  id: string;
  title: string;
  userId: string;
  avatarIcon: string;
  typeOfChange: string;
  projectId: string;
  itemId: string;
  createdBy: string;
  createdAt: Date;
  updatedAt: Date;
  _doc?: any;
  View(): IActivity;
}

const activitySchema = new Schema(
  {
    title: String,
    typeOfChange: String,
    avatarIcon: String,
    projectId: {
      type: Schema.Types.ObjectId,
      ref: "Project",
    },
    itemId: {
      type: Schema.Types.ObjectId,
      ref: "Item",
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  },
  {
    timestamps: true,
  }
);

activitySchema.methods = {
  View() {
    return {
      ...this._doc,
    };
  },
};

const Activity = model<IActivity>("Activity", activitySchema);
export default Activity;
