import { Document, model, Schema } from "mongoose"

export interface IAddress extends Document
{
  name: string
  locationId: string
  villageId: string
  addressType: string
  address: string
  dotcolor: string
  mobileNumber: string
  createdAt: Date
  updatedAt: Date
  _doc?: any,
  View(): IAddress
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
      default: "default",
    },
  },
  {
    timestamps: true,
  }
)

addressSchema.methods = {
  View()
  {
    return {
      ...this._doc,
      password: undefined
    }
  }
}

export const AddressModel = model<IAddress>( "Address", addressSchema )
