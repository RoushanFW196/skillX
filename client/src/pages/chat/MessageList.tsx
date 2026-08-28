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
    <ScrollArea className="bg-neutral-50 dark:bg-neutral-900" style={{ flex: 1, padding: "20px 0" }}>
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
                  className={`shadow-sm px-3 py-2 ${
                    isMine
                      ? "bg-primary-600 text-white rounded-2xl rounded-br-md"
                      : "bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 text-neutral-800 dark:text-neutral-200 rounded-2xl rounded-bl-md"
                  }`}
                >
                  {/* Name (only for others & first message in group) */}
                  {!isMine && !isSameSender && (
                    <Text
                      size="xs"
                      fw={600}
                      mb={2}
                      className="text-primary-600 dark:text-primary-400"
                    >
                      {msg.sender?.name}
                    </Text>
                  )}

                  {/* Message text */}
                  <Text size="sm" style={{ lineHeight: 1.4 }}>
                    {msg.content?.text}
                  </Text>

                  {/* Timestamp */}
                  <Text
                    size="10px"
                    ta="right"
                    mt={4}
                    className={
                      isMine
                        ? "text-white/70"
                        : "text-neutral-500 dark:text-neutral-400"
                    }
                  >
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
