import { Document, model, Schema } from "mongoose"

export interface IBank extends Document
{
  name: string
  addressId: string
  branch: string
  createdAt: Date
  updatedAt: Date
  _doc?: any,
  View(): IBank
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
  },
  {
    timestamps: true,
  }
)

bankSchema.methods = {
  View()
  {
    return {
      ...this._doc,
      password: undefined
    }
  }
}

export const BankModel = model<IBank>( "Bank", bankSchema )
