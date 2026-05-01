import { IconMessageCircle, IconUsers } from "@tabler/icons-react";
import { Button } from "@mantine/core";

export default function ChatEmptyState() {
  return (
    <div
      style={{
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
        textAlign: "center",
        color: "#666",
      }}
    >
      {/* Icon */}
      <div
        style={{
          background: "#f5f5f5",
          borderRadius: "50%",
          padding: "20px",
          marginBottom: "20px",
        }}
      >
        <IconMessageCircle size={40} />
      </div>

      {/* Heading */}
      <h1 style={{ fontSize: "28px", fontWeight: "600", color: "#222" }}>
        Choose a user to chat
      </h1>

      {/* Subtext */}
      <p style={{ marginTop: "8px", maxWidth: "400px" }}>
        Select a conversation from the left or start a new chat with someone in
        your network.
      </p>

      {/* Optional CTA */}
      <Button
        leftSection={<IconUsers size={14} />}
        variant="filled"
        className="mt-6"
      >
        Browse Users
      </Button>
    </div>
  );
}
