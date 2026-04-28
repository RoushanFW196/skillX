import { io, Socket } from "socket.io-client";

let socket: Socket | null = null;

export const connectSocket = (userId: string) => {
  if (!userId) return null;

  // ✅ Prevent multiple connections
  if (socket && socket.connected) {
    return socket;
  }

  socket = io(import.meta.env.VITE_SOCKET_URL, {
    auth: { userId }, // ✅ better than query
    transports: ["websocket"], // 🔥 important
    withCredentials: true,
  });

  socket.on("connect", () => {
    console.log("✅ Socket connected:", socket?.id);
  });

  socket.on("disconnect", () => {
    console.log("❌ Socket disconnected");
  });

  return socket;
};

export const getSocket = () => socket;