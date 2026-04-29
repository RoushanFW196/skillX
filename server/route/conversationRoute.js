import express from "express";
import { Conversation } from "../modals/conversation.modal.js";
import {
  createConversation,
  getConversationsByUserId,
} from "../controller/conversation.controller.js";

const router = express.Router();

// Create or get existing conversation between two users
router.post("/create", createConversation);
router.get("/", getConversationsByUserId);

export default router;
