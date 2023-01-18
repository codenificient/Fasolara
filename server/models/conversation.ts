import { Document, model, Schema } from "mongoose"

interface User
{
	_id: String
	name: String
	avatar: String
	phone: String
}

interface Message
{
	_id: String
	senderId: User
	date: String
	content: String
	status: String
}

interface Participants
{
	userid: User
	connect: String
	avatar: String
	name: String
	phone: String
}

export interface IConvo extends Document
{
	participants: [Participants]
	status: String
	messages: [Message]
	createdBy: User
	createdAt: String
	updatedAt: String
	_doc?: any,
	View(): IConvo
}

const conversationSchema = new Schema(
	{
		participants: [
			{
				userid: {
					type: Schema.Types.ObjectId,
					ref: "User",
				},
				connect: {
					type: String,
					enum: ["online", "offline"],
					default: "offline",
				},
				avatar: {
					type: String,
					trim: true,
				},
				name: {
					type: String,
					trim: true,
				},
				phone: {
					type: String,
					trim: true,
				},
			},
		],
		status: {
			type: String,
			enum: ["active", "archived"],
			default: "active",
		},
		messages: [
			{
				senderId: {
					type: Schema.Types.ObjectId,
					ref: "User",
				},
				date: {
					type: Date,
					default: new Date(),
				},
				content: {
					type: String,
					trim: true,
				},
				status: {
					type: String,
					enum: ["sent", "failed", "read", "inactive", "delivered", "deleted"],
					default: "sent",
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

conversationSchema.methods = {
	View()
	{
		return {
			...this._doc,
		}
	}
}

const Conversation = model<IConvo>( "Conversation", conversationSchema )
export default Conversation 