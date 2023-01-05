const { Schema, model } = require("mongoose");

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
  },
  {
    timestamps: true,
  }
);

module.exports = model("Conversation", conversationSchema);
