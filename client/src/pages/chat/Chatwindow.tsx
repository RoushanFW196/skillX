import ChatHeader from "./ChatHeader";
import MessageList from "./MessageList";
import MessageInput from "./MessageInput";
import { useEffect, useState } from "react";
import { useAtom } from "jotai";
import { userInfoAtom } from "../../store/atom.js";
import { socket } from "../../utils/socket.js";

export default function ChatWindow({
  conversationId,
}: {
  conversationId: string | undefined;
}) {
  const [messages, setMessages] = useState([]);

  const [loggedInuser, setLoggedInUser] = useAtom(userInfoAtom);

  // ✅ 1. Fetch initial messages
  useEffect(() => {
    const fetchMessages = async () => {
      const res = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/messages/${conversationId}`,
      );
      const data = await res.json();
      setMessages(data);
    };

    if (conversationId) fetchMessages();
  }, [conversationId]);

  // ✅ 2. Join room
  useEffect(() => {
    if (!conversationId) return;

    socket.emit("joinConversation", conversationId);

    return () => {
      socket.emit("leaveConversation", conversationId);
    };
  }, [conversationId]);

  // ✅ 3. Listen for incoming messages (NO DUPLICATES)
  useEffect(() => {
    const handler = (msg) => {
      setMessages((prev) => {
        const exists = prev.some((m) => m._id === msg._id);
        if (exists) return prev; // 🔥 prevents duplicate
        return [...prev, msg];
      });
    };

    socket.on("receiveMessage", handler);

    return () => socket.off("receiveMessage", handler);
  }, []);

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100%" }}>
      <ChatHeader />
      <MessageList messages={messages} currentUser={loggedInuser} />
      <MessageInput
        conversationId={conversationId}
        setMessages={setMessages}
        user={loggedInuser}
      />
    </div>
  );
}
