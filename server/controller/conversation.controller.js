import { Conversation } from "../modals/conversation.modal.js";

export const createConversation = async (req, res) => {
  const { senderId, receiverId } = req.body;

  try {
    // Check if conversation already exists
    let conversation = await Conversation.findOne({
      "members.userId": { $all: [senderId, receiverId] },
    });

    if (!conversation) {
      // Create new conversation
      conversation = new Conversation({
        members: [
          { userId: senderId, role: "learner" },
          { userId: receiverId, role: "mentor" },
        ],
      });
      await conversation.save();
    }
    return res.status(200).json(conversation);
  } catch (error) {
    console.error("Error creating conversation:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
