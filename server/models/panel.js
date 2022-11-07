const mongoose = require("mongoose")

const panelSchema = new mongoose.Schema(
  {
    accountId: {
      type: mongoose.Schema.Types.ObjectId,
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
        type: Date
      }
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
)

module.exports = mongoose.model("Panel", panelSchema)
