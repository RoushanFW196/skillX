import { ScrollArea, TextInput, Avatar, Group, Text } from "@mantine/core";
import { IconSearch } from "@tabler/icons-react";

export default function ChatSidebar() {
  return (
    <>
      {/* Search */}
      <TextInput
        placeholder="Search chats..."
        leftSection={<IconSearch size={16} />}
        m="sm"
      />

      {/* Chat List */}
      <ScrollArea h="90%">
        {[1, 2, 3].map((chat) => (
          <Group
            key={chat}
            p="sm"
            style={{ cursor: "pointer", borderBottom: "1px solid #f1f1f1" }}
          >
            <Avatar radius="xl" />

            <div>
              <Text fw={500}>User Name</Text>
              <Text size="sm" c="dimmed">
                Last message...
              </Text>
            </div>
          </Group>
        ))}
      </ScrollArea>
    </>
  );
}