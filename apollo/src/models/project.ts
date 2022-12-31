import { Schema, model } from "mongoose"

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
      default: false,
    },
  },
  {
    timestamps: true,
  }
)

export const ProjectModel = model("Project", projectSchema)
