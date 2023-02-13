import { Document, model, Schema } from "mongoose";

export interface ITeam extends Document {
  name: string;
  motto: string;
  specialty: string;
  managerId: string;
  astManagerId: string;
  teamLeadId: string;
  memberIds: [string];
  createdBy: string;
  createdAt: Date;
  updatedAt: Date;
  _doc?: any;
  View(): ITeam;
}

const teamSchema = new Schema(
  {
    name: String,
    motto: String,
    specialty: String,
    managerId: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    astManagerId: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    teamLeadId: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    memberIds: [
      {
        userId: {
          type: Schema.Types.ObjectId,
          ref: "User",
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

teamSchema.methods = {
  View() {
    return {
      ...this._doc,
    };
  },
};

const Team = model<ITeam>("Team", teamSchema);
export default Team;
