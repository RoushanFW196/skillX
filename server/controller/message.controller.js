import { Message } from "../modals/message.modal.js";
import { Conversation } from "../modals/conversation.modal.js";
import { io } from "../server.js";

export const sendMessage = async (req, res) => {
  try {
    const { conversationId, sender, content } = req.body;

    // ✅ 1. Validation
    if (!conversationId || !sender || !content?.text) {
      return res.status(400).json({ message: "Invalid payload" });
    }

    // ✅ 2. Save message
    let message = await Message.create({
      conversationId,
      sender,
      content: { text: content.text },
    });

    // ✅ 3. Populate BEFORE emit
    message = await message.populate("sender", "name profilePic");

    // ✅ 4. Update conversation
    await Conversation.findByIdAndUpdate(conversationId, {
      lastMessage: {
        messageId: message._id,
        sender: sender,
        content: content.text,
        createdAt: message.createdAt,
      },
      updatedAt: new Date(),
    });

    // ✅ 5. Emit AFTER everything is ready
    io.to(conversationId).emit("receiveMessage", message);

    // ✅ 6. Send response
    return res.status(201).json(message);
  } catch (error) {
    console.error("Send message error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

export const getMessages = async (req, res) => {
  try {
    const { conversationId } = req.params;

    // optional query params
    const { page = 1, limit = 20 } = req.query;

    const messages = await Message.find({ conversationId })
      .populate("sender", "name profilePic")
      .sort({ createdAt: -1 }) // 🔥 latest first
      .limit(limit * 1)
      .skip((page - 1) * limit);

    // reverse so UI shows oldest → newest
    const orderedMessages = messages.reverse();

    res.json(orderedMessages);

  } catch (error) {
    console.error("Get messages error:", error);
    res.status(500).json({ message: "Server error" });
  }
};