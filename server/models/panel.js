const { Schema, model } = require("mongoose");

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
        comments: {
          type: Schema.Types.ObjectId,
          ref: "Comment",
        },
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

module.exports = model("Panel", panelSchema);
