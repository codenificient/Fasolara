import { Document, model, Schema } from "mongoose";

export interface IBank extends Document {
  name: string;
  addressId: string;
  branch: string;
  createdBy: string;
  createdAt: Date;
  updatedAt: Date;
  _doc?: any;
  View(): IBank;
}

const bankSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    addressId: {
      type: Schema.Types.ObjectId,
      ref: "Address",
    },
    branch: {
      type: String,
      required: true,
      trim: true,
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

bankSchema.methods = {
  View() {
    return {
      ...this._doc,
      password: undefined,
    };
  },
};

const Bank = model<IBank>("Bank", bankSchema);
export default Bank;
