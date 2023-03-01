import { Document,model, Schema } from "mongoose";

export interface IAgenda extends Document {
  name: string;
  agendaType: string;
  location: string;
  avatarIcon: string;
  createdBy: string;
  startTime: Date;
  endTime: Date;
  createdAt: Date;
  updatedAt: Date;
  _doc?: any;
  View(): IAgenda;
}

const agendaSchema = new Schema(
  {
    name: String,
    agendaType: String,
    location: String,
    avatarIcon: String,
    startTime: Date,
    endTime: Date,
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  },
  {
    timestamps: true,
  }
);

agendaSchema.methods = {
  View() {
    return {
      ...this._doc,
    };
  },
};

const Agenda = model<IAgenda>( "Agenda", agendaSchema )
export default Agenda
