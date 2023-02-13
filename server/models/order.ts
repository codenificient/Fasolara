import { Document, model, Schema } from "mongoose";

export interface IOrder extends Document {
  orderDate: Date;
  userId: string;
  deliveryUserId: string;
  supplierId: string;
  quantity: number;
  purchaseCost: number;
  finalCost: number;
  currency: string;
  finalCurrency: string;
  status: string;
  updates: [IUpdate];
  createdBy: string;
  createdAt: Date;
  updatedAt: Date;
  _doc?: any;
  View(): IOrder;
}

interface IUpdate {
  userId: string;
  comment: String;
  date: Date;
}

const orderSchema = new Schema(
  {
    orderDate: {
      type: Date,
      default: Date.now,
    },
    deliveryDate: {
      type: Date,
      default: Date.now,
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    deliveryUserId: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    supplierId: {
      type: Schema.Types.ObjectId,
      ref: "Supplier",
    },
    quantity: {
      type: Number,
      default: 1,
    },
    purchaseCost: {
      type: Number,
      default: 1,
    },
    currency: {
      type: String,
      default: "cfa",
      enum: ["cfa", "usd", "cad", "aud", "cny", "rub"],
    },
    finalCost: {
      type: Number,
      default: 0,
    },
    finalCurrency: {
      type: String,
      default: "usd",
    },
    status: {
      type: String,
      default: "submitted",
      enum: [
        "pending",
        "awaiting payment",
        "awaiting fulfillment",
        "awaiting shipment",
        "awaiting pickup",
        "partially shipped",
        "shipped",
        "completed",
        "delivered",
        "cancelled",
        "declined",
        "refunded",
        "disputed",
        "partially refunded",
        "Manual Verification Required",
      ],
    },
    updates: [
      {
        userId: {
          type: Schema.Types.ObjectId,
          ref: "User",
        },
        comment: String,
        date: {
          type: Date,
          default: new Date(),
        },
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

orderSchema.methods = {
  View() {
    return {
      ...this._doc,
    };
  },
};

const Order = model<IOrder>("Order", orderSchema);
export default Order;
