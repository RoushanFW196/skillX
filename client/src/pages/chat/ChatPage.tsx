import { Grid } from "@mantine/core";
import ChatSidebar from "./ChatSidebar";
import ChatWindow from "./Chatwindow";
import { getSocket } from "../../utils/socket.js";
import { onlineUsersAtom, userInfoAtom } from "../../store/atom.js";
import { useParams } from "react-router";
import { useEffect } from "react";
import { useAtom } from "jotai";

export default function ChatPage() {
  const { conversationId } = useParams(); // TODO: get from URL or state
  const [onlineUsers, setOnlineUsers] = useAtom(onlineUsersAtom);
  // console.log("ChatPage conversationId:", conversationId); // 🔥 debug

  useEffect(() => {
    const socket = getSocket();

    if (!socket) return;

    const handleOnlineUsers = (users: string[]) => {
      console.log("online users:", users);
      // update atom here
      setOnlineUsers(users);
    };

    socket.on("onlineUsers", handleOnlineUsers);

    return () => {
      socket.off("onlineUsers", handleOnlineUsers);
    };
  }, []);

  return (
    <Grid style={{ height: "100vh" }}>
      {/* Sidebar */}
      <Grid.Col span={4} style={{ borderRight: "1px solid #eee" }}>
        <ChatSidebar />
      </Grid.Col>

      {/* Chat Window */}
      <Grid.Col span={8}>
        <ChatWindow conversationId={conversationId} />
      </Grid.Col>
    </Grid>
  );
}
