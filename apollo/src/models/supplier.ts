import { Schema, model } from "mongoose"

const supplierSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    accountId: {
      type: Schema.Types.ObjectId,
      ref: "Account",
    },
    addressId: {
      type: Schema.Types.ObjectId,
      ref: "Address",
    },
    isActive: {
      type: Boolean,
      default: false,
    },

    area: {
      type: String,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
)

const Supplier = model("Supplier", supplierSchema)
export default Supplier