import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import http from "http";
import { Server } from "socket.io";

import connectDB from "./db/db.js";
import userRoutes from "./route/userRoute.js";
import skillRoutes from "./route/skillRoute.js";
import conversationRoutes from "./route/conversationRoute.js";
import MessagesRoutes from "./route/messageRoute.js";

const PORT = process.env.PORT || 3000;

const app = express();

// ✅ Create HTTP server
const server = http.createServer(app);

// ✅ Attach Socket.IO
export const io = new Server(server, {
  cors: {
    origin: process.env.CLIENT_URL,
    credentials: true,
  },
});

let onlineUsers = new Map(); // userId => Set of socketIds

io.on("connection", (socket) => {
  console.log("User connected with socketid:", socket.id);

  const userId = socket.handshake.auth.userId;
  if (!userId) return;

  // ✅ Add socket
  if (!onlineUsers.has(userId)) {
    onlineUsers.set(userId, new Set());
  }

  onlineUsers.get(userId).add(socket.id);

  // ✅ Emit updated list
  io.emit("onlineUsers", Array.from(onlineUsers.keys()));

  // 👉 Rooms
  socket.on("joinConversation", (conversationId) => {
    socket.join(conversationId);
  });

  socket.on("leaveConversation", (conversationId) => {
    socket.leave(conversationId);
  });

  // ✅ Proper disconnect handling
  socket.on("disconnect", () => {
    console.log("User disconnected:", socket.id);

    const userSockets = onlineUsers.get(userId);

    if (userSockets) {
      userSockets.delete(socket.id);

      // if no sockets left → user offline
      if (userSockets.size === 0) {
        onlineUsers.delete(userId);
      }
    }

    // ✅ Emit updated list again
    io.emit("onlineUsers", Array.from(onlineUsers.keys()));
  });
});

// ✅ Middlewares
app.use(
  cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
  }),
);

app.use(cookieParser());
app.use(express.json());

// ✅ Routes
app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use("/api/user", userRoutes);
app.use("/api/skills", skillRoutes);
app.use("/api/conversations", conversationRoutes);
app.use("/api/messages", MessagesRoutes);

// ✅ Start server
server.listen(PORT, async () => {
  await connectDB();
  console.log(`Server is running on port ${PORT}`);
});
