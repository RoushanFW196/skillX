import { ScrollArea, TextInput, Avatar, Group, Text } from "@mantine/core";
import { IconSearch } from "@tabler/icons-react";
import { userInfoAtom } from "../../store/atom.js";
import { useAtom } from "jotai";
import { useNavigate, useParams } from "react-router";

export default function ChatSidebar({ conversations }) {
  const [userInfo] = useAtom(userInfoAtom);
  const navigate = useNavigate();
  const { conversationId } = useParams();

  const handleStartChat = (conversationId: string, userId: string) => {
    navigate(`/app/chat/${conversationId}?userId=${userId}`);
  };

  return (
    <div>
      <TextInput
        placeholder="Search chats..."
        leftSection={<IconSearch size={16} />}
        m="sm"
      />

      <ScrollArea h="90%">
        {conversations.map((conversation: any) => {
          const otherMember = conversation.members.find(
            (m) => m.userId._id !== userInfo._id,
          );
          const isActive = conversation._id === conversationId;

          return (
            <Group
              key={conversation._id}
              p="sm"
              style={{
                cursor: "pointer",
                borderBottom: "1px solid #f1f1f1",
                backgroundColor: isActive ? "#e7f1ff" : "white",
              }}
              onClick={() =>
                handleStartChat(conversation._id, otherMember?.userId._id)
              }
            >
              <Avatar radius="xl" src={otherMember?.userId.profilePic} />

              <div>
                <Text fw={500}>{otherMember?.userId.name}</Text>

                <Text size="sm" c="dimmed">
                  {conversation.lastMessage?.content || "No messages yet"}
                </Text>
              </div>
            </Group>
          );
        })}
      </ScrollArea>
    </div>
  );
}
