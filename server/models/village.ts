import { Document, model, Schema } from "mongoose";

export interface IVillage extends Document {
  name: string;
  population: number;
  urbanCommune: boolean;
  dotcolor: string;
  provinceId: string;
  createdBy: string;
  createdAt: Date;
  updatedAt: Date;
  _doc?: any;
  View(): IVillage;
}

const villageSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    population: {
      type: Number,
      required: true,
    },
    dotcolor: {
      type: String,
      default: "brown",
    },
    provinceId: {
      type: Schema.Types.ObjectId,
      ref: "Province",
    },
    urbanCommune: {
      type: Boolean,
      default: false,
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

villageSchema.methods = {
  View() {
    return {
      ...this._doc,
    };
  },
};

const Village = model<IVillage>("Village", villageSchema);
export default Village;
