import { Document, model, Schema } from "mongoose";

export interface ISupplier extends Document {
  name: string;
  accountID: string;
  addressId: string;
  isActive: boolean;
  area: [string];
  createdBy: string;
  createdAt: Date;
  updatedAt: Date;
  _doc?: any;
  View(): ISupplier;
}

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
    area: [
      {
        type: String,
        trim: true,
      },
    ],
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  },
  {
    timestamps: true,
  }
);

supplierSchema.methods = {
  View() {
    return {
      ...this._doc,
    };
  },
};

const Supplier = model<ISupplier>("Supplier", supplierSchema);
export default Supplier;
