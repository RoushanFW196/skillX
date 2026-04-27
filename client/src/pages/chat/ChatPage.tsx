import { Grid } from "@mantine/core";
import ChatSidebar from "./ChatSidebar";
import ChatWindow from "./Chatwindow";
import { useParams } from "react-router";

export default function ChatPage() {
  const { conversationId } = useParams(); // TODO: get from URL or state

   console.log("ChatPage conversationId:", conversationId); // 🔥 debug


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