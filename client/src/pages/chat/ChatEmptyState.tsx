import { IconMessageCircle, IconUsers } from "@tabler/icons-react";
import { Button } from "@mantine/core";

export default function ChatEmptyState() {
  return (
    <div className="h-full flex items-center justify-center flex-col text-center text-neutral-500 dark:text-neutral-400">
      {/* Icon */}
      <div className="bg-primary-50 dark:bg-primary-950/60 text-primary-600 dark:text-primary-400 rounded-full p-5 mb-5">
        <IconMessageCircle size={40} />
      </div>

      {/* Heading */}
      <h1 className="text-[28px] font-semibold text-neutral-800 dark:text-neutral-100">
        Choose a user to chat
      </h1>

      {/* Subtext */}
      <p className="mt-2 max-w-[400px]">
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
