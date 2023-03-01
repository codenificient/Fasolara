import { Document, model, Schema } from "mongoose";
import geocoder from "../helpers/geocoder.js";

export interface ILocation extends Document {
  name: string;
  address: string;
  location: {
    locationType: string;
    coordinates: Array<number>;
    formattedAddress: string;
  };
  createdBy: string;
  createdAt: Date;
  updatedAt: Date;
  _doc?: any;
  View(): ILocation;
}

enum LocationType {
  Point = "Point",
  City = "City",
  Province = "Province",
  Country = "Country",
  Continent = "Continent",
}

const locationSchema = new Schema(
  {
    name: String,
    address: {
      type: String,
      required: [true, "Please provide a valid address"],
    },
    location: {
      locationType: {
        type: String,
        enum: ["Point", "City", "Province", "Country", "Continent"],
        default: "Point",
      },
      coordinates: {
        type: [Number],
        index: "2dsphere",
      },
      formattedAddress: String,
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

// Geocode and create a location
locationSchema.pre("save", async function (next) {
  const loc = await geocoder.geocode(this.address);
  this.location = {
    locationType: "Point",
    coordinates: [loc[0].latitude, loc[0].longitude],
    formattedAddress: loc[0].formattedAddress,
  };
  next();
});

locationSchema.methods = {
  View() {
    return {
      ...this._doc,
    };
  },
};

const Location = model<ILocation>("Location", locationSchema);
export default Location;
