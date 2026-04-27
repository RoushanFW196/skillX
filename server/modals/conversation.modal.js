import mongoose from "mongoose";

const { ObjectId } = mongoose.Schema.Types;
const conversationSchema = new mongoose.Schema(
  {
    type: {
      type: String,
      enum: ["direct", "group"],
      default: "direct",
    },

    members: [
      {
        userId: { type: ObjectId, ref: "User" },
        role: {
          type: String,
          enum: ["mentor", "learner", ],
          default: "member",
        },
        joinedAt: { type: Date, default: Date.now },

        // 🔥 important for unread count
        lastReadAt: { type: Date, default: null },
      },
    ],

    // 🔥 optimization (avoid extra query)
    lastMessage: {
      messageId: { type: ObjectId, ref: "Message" },
      sender: { type: ObjectId, ref: "User" },
      content: String,
      createdAt: Date,
    },

    // optional (for groups)
    name: String,
    avatar: String,

    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);


// Conversations
conversationSchema.index({ "members.userId": 1 });
conversationSchema.index({ updatedAt: -1 });


export const Conversation = mongoose.model("Conversation", conversationSchema);