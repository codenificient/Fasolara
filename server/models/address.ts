import { Document, model, Schema } from "mongoose";

export interface IAddress extends Document {
  name: string;
  locationId: string;
  villageId: string;
  addressType: string;
  address: string;
  dotcolor: string;
  mobileNumber: string;
  createdBy: string;
  createdAt: Date;
  updatedAt: Date;
  _doc?: any;
  View(): IAddress;
}

const addressSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    locationId: {
      type: Schema.Types.ObjectId,
      ref: "Location",
    },
    villageId: {
      type: Schema.Types.ObjectId,
      ref: "Village",
    },
    addressType: {
      type: String,
      required: true,
      enum: ["home", "work", "friend", "office", "doctor", "hq", "branch"],
      default: "home",
    },
    address: {
      type: String,
      trim: true,
    },
    dotcolor: {
      type: String,
      default: "#ff3f1f",
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

addressSchema.methods = {
  View() {
    return {
      ...this._doc,
    };
  },
};

const Address = model<IAddress>("Address", addressSchema);
export default Address;
