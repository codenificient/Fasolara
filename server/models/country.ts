import { Document, model, Schema } from "mongoose";

export interface ICountry extends Document {
  name: string;
  population: number;
  continent: String;
  polycolor: String;
  createdBy: string;
  createdAt: Date;
  updatedAt: Date;
  _doc?: any;
  View(): ICountry;
}

const countrySchema = new Schema(
  {
    name: String,
    population: {
      type: Number,
      default: 801, // Vatican population - smallest
    },
    continent: {
      type: String,
      enum: ["Africa", "Asia", "Europe"],
      default: "Africa",
    },
    locationId: {
      type: Schema.Types.ObjectId,
      ref: "Location",
    },
    polycolor: {
      type: String,
      default: "yellow",
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

countrySchema.methods = {
  View() {
    return {
      ...this._doc,
    };
  },
};

const Country = model<ICountry>("Country", countrySchema);
export default Country;
