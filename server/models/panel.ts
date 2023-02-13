import { Document, model, Schema } from "mongoose";

export interface IPanel extends Document {
  id: string;
  serialNumber: string;
  installCost: number;
  installDate: Date;
  orderId: string;
  groupId: string;
  isActive: boolean;
  isInstalled: boolean;
  isReplacement: boolean;
  ratedCapacity: [
    {
      date: Date;
      capacity: number;
    }
  ];
  maintenanceDates: [
    {
      start: Date;
      complete: Date;
      comment: string;
    }
  ];
  createdBy: string;
  createdAt: Date;
  updatedAt: Date;
  _doc?: any;
  View(): IPanel;
}

const panelSchema = new Schema(
  {
    accountId: {
      type: Schema.Types.ObjectId,
      ref: "Account",
    },
    serialNumber: String,
    installCost: {
      type: Number,
      default: 0.0,
    },
    installDate: Date,
    orderDate: Date,
    maintenanceDates: [
      {
        start: Date,
        complete: Date,
        comment: String,
      },
    ],
    ratedCapacity: [
      {
        date: Date,
        capacity: Number,
      },
    ],
    isReplacement: {
      type: Boolean,
      default: false,
    },
    isActive: {
      type: Boolean,
      default: false,
    },
    isInstalled: {
      type: Boolean,
      default: false,
    },
    groupId: String,
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  },
  {
    timestamps: true,
  }
);

panelSchema.methods = {
  View() {
    return {
      ...this._doc,
    };
  },
};

const Panel = model<IPanel>("Panel", panelSchema);
export default Panel;
