import { Document, model, Schema } from "mongoose";

export interface IProject extends Document {
  name: string;
  zone: string;
  dotcolor: string;
  addressId: string;
  managerId: string;
  teamIds: [string];
  branch: string;
  impact: number;
  suppliers: [
    {
      supplierId: string;
      hiringDate: Date;
    }
  ];
  supplierId: string;
  isComplete: boolean;
  isActive: boolean;
  createdBy: string;
  createdAt: Date;
  updatedAt: Date;
  _doc?: any;
  View(): IProject;
}

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
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  },
  {
    timestamps: true,
  }
);

projectSchema.methods = {
  View() {
    return {
      ...this._doc,
    };
  },
};

const Project = model<IProject>("Project", projectSchema);
export default Project;
