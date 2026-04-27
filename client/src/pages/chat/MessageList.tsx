import { ScrollArea, Box, Text, Avatar, Group } from "@mantine/core";
import { useEffect, useRef } from "react";

export default function MessageList({
  messages,
  currentUser,
}: {
  messages: any[];
  currentUser: any;
}) {
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <ScrollArea
      style={{
        flex: 1,
        padding: "20px 0",
        background: "#f7f7f8",
      }}
    >
      <Box
        style={{
          maxWidth: "800px",
          margin: "0 auto",
          padding: "0 16px",
        }}
      >
        {messages.map((msg, index) => {
          const isMine = msg.sender?._id === currentUser?._id;

          // 🔥 check previous message for grouping
          const prevMsg = messages[index - 1];
          const isSameSender = prevMsg?.sender?._id === msg.sender?._id;

          return (
            <Box
              key={msg._id}
              style={{
                display: "flex",
                justifyContent: isMine ? "flex-end" : "flex-start",
                marginBottom: isSameSender ? "4px" : "14px",
              }}
            >
              <Group align="flex-end" gap="8px">
                {/* Avatar only when sender changes */}
                {!isMine && !isSameSender && (
                  <Avatar src={msg.sender?.profilePic} radius="xl" size="sm" />
                )}

                <Box
                  style={{
                    background: isMine
                      ? "linear-gradient(135deg, #d1f5d3, #b2e5b5)"
                      : "#ffffff",
                    padding: "10px 12px",
                    borderRadius: isMine
                      ? "16px 16px 4px 16px"
                      : "16px 16px 16px 4px",

                    boxShadow: "0 2px 6px rgba(0,0,0,0.05)",
                    border: isMine ? "none" : "1px solid #eee",
                  }}
                >
                  {/* Name (only for others & first message in group) */}
                  {!isMine && !isSameSender && (
                    <Text size="xs" fw={600} mb={2} c="blue">
                      {msg.sender?.name}
                    </Text>
                  )}

                  {/* Message text */}
                  <Text size="sm" style={{ lineHeight: 1.4 }}>
                    {msg.content?.text}
                  </Text>

                  {/* Timestamp */}
                  <Text size="10px" c="dimmed" ta="right" mt={4}>
                    {new Date(msg.createdAt).toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </Text>
                </Box>
              </Group>
            </Box>
          );
        })}

        <div ref={bottomRef} />
      </Box>
    </ScrollArea>
  );
}
