import { socket } from "../../utils/socket.js";
import { useState } from "react";
import { TextInput, ActionIcon, Group } from "@mantine/core";
import { IconSend } from "@tabler/icons-react";

export default function MessageInput({
  conversationId,
  setMessages,
  user,
}: {
  conversationId: string;
  setMessages: React.Dispatch<React.SetStateAction<any[]>>;
  user: any;
}) {
  const [text, setText] = useState("");

  const sendMessage = async () => {
    if (!text.trim()) return;

    const tempMessage = {
      _id: Date.now(), // temporary ID
      content: { text },
      sender: user._id,
      createdAt: new Date(),
      pending: true,
    };

    // ✅ 1. Optimistic update
  //  setMessages((prev: any) => [...prev, tempMessage]);

    setText("");

    try {
      // ✅ 2. Save to backend
      const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/messages`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          conversationId,
          sender: user._id,
          content: { text },
        }),
      });

      const savedMessage = await res.json();

      // ✅ 3. Emit via socket
      socket.emit("sendMessage", savedMessage);

      // ✅ 4. Replace temp message
      setMessages((prev) =>
        prev.map((msg) => (msg._id === tempMessage._id ? savedMessage : msg)),
      );
    } catch (err) {
      console.error(err);
    }
  };

  const onEnterPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <Group p="sm">
      <TextInput
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Type message..."
        style={{ flex: 1 }}
        onKeyUp={onEnterPress}
      />
      <ActionIcon onClick={sendMessage}>
        <IconSend size={18} />
      </ActionIcon>
    </Group>
  );
}
