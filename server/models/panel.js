const { Schema, model } = require("mongoose");

const panelSchema = new Schema(
  {
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
        comments: String,
      },
    ],
    ratedCapacities: [
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

module.exports = model("Panel", panelSchema);
