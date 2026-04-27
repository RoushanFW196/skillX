import { Group, Avatar, Text } from "@mantine/core";

export default function ChatHeader() {
  return (
    <Group
      p="md"
      style={{ borderBottom: "1px solid #eee" }}
      justify="space-between"
    >
      <Group>
        <Avatar radius="xl" />
        <div>
          <Text fw={500}>Roushan Kumar</Text>
          <Text size="xs" c="green">
            Online
          </Text>
        </div>
      </Group>
    </Group>
  );
}