import { Schema, model } from "mongoose"

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
  },
  {
    timestamps: true,
  }
);

export const PanelModel = model("Panel", panelSchema);
