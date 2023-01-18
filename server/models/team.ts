import { model, Schema } from "mongoose"


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
)

const Team = model( "Team", teamSchema )
export default Team
