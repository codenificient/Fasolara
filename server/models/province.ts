import { Document, model, Schema } from "mongoose";

export interface IProvince extends Document {
  name: string;
  region: string;
  seat: string;
  countryId: string;
  zone: string;
  polycolor: string;
  createdBy: string;
  createdAt: Date;
  updatedAt: Date;
  _doc?: any;
  View(): IProvince;
}

const provinceSchema = new Schema(
  {
    region: {
      type: String,
      required: true,
      trim: true,
    },
    name: {
      type: String,
      required: true,
      trim: true,
    },
    seat: {
      type: String,
      required: true,
      trim: true,
    },
    countryId: {
      type: Schema.Types.ObjectId,
      ref: "Country",
    },
    polycolor: {
      type: String,
      default: "beige",
    },
    zone: {
      type: String,
      enum: ["sahelienne", "soudanaise", "sudano-sahelienne"], // add more
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

provinceSchema.methods = {
  View() {
    return {
      ...this._doc,
    };
  },
};

const Province = model<IProvince>("Province", provinceSchema);
export default Province;
