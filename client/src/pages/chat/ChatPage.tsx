import { Grid } from "@mantine/core";
import { useParams } from "react-router";
import { useEffect, useState } from "react";
import { useAtom } from "jotai";
import ChatSidebar from "./ChatSidebar";
import ChatWindow from "./Chatwindow";
import { getSocket } from "../../utils/socket.js";
import { onlineUsersAtom, userInfoAtom } from "../../store/atom.js";
import ChatEmptyState from "./ChatEmptyState.js";

export default function ChatPage() {
  const { conversationId } = useParams();
  const [onlineUsers, setOnlineUsers] = useAtom(onlineUsersAtom);
  const [userInfo] = useAtom(userInfoAtom);
  const [conversations, setConversations] = useState([]);

  useEffect(() => {
    if (!userInfo) return;
    fetchAllConversations();
  }, [userInfo]);

  useEffect(() => {
    const socket = getSocket();
    if (!socket) return;

    const handleOnlineUsers = (users) => {
      setOnlineUsers(users);
    };

    socket.on("onlineUsers", handleOnlineUsers);

    return () => {
      socket.off("onlineUsers", handleOnlineUsers);
    };
  }, []);

  const fetchAllConversations = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/conversations?userId=${userInfo._id}`
      );
      const data = await response.json();
      setConversations(data);
      if (!response.ok) {
        throw new Error("Failed to fetch conversations");
      }
    } catch (error) {
      console.error("Error fetching conversations:", error);
    }
  };

  return (
    <Grid style={{overflow: "hidden", height: "auto" }}>
      {/* Sidebar */}
      <Grid.Col span={4} style={{ borderRight: "1px solid #eee" }}>
        <ChatSidebar conversations={conversations} />
      </Grid.Col>

      {/* Chat Window */}
        {conversationId ? (
        <Grid.Col span={8}>
          <ChatWindow conversationId={conversationId} />
        </Grid.Col>
        ) : (
        <Grid.Col span={8}  className="mt-20">
            <ChatEmptyState />
      </Grid.Col>
      )}
    </Grid>
  );
}
