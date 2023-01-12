const { Schema, model } = require("mongoose");

const projectSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    zone: {
      type: String,
      required: true,
    },
    branch: {
      type: String,
      required: true,
      trim: true,
    },
    dotcolor: {
      type: String,
      required: true,
      default: "default",
    },
    impact: {
      type: Number,
      default: 0,
    },
    addressId: {
      type: Schema.Types.ObjectId,
      ref: "Address",
    },
    teamIds: {
      teamId: {
        type: Schema.Types.ObjectId,
        ref: "Team",
      },
    },
    suppliers: [
      {
        supplierId: {
          type: Schema.Types.ObjectId,
          ref: "Supplier",
        },
        hiringDate: {
          type: Date,
        },
      },
    ],
    isComplete: {
      type: Boolean,
      default: false,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    status: {
      type: String,
      enum: [
        "preparation",
        "financing",
        "prospecting",
        "complete",
        "installation",
        "clearing",
        "commissioning",
        "decommissioned",
      ],
      default: "prospecting", // only activate when ready to install
    },
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = model("Project", projectSchema);
