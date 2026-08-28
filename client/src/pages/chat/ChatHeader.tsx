import { Group, Avatar, Text, Indicator } from "@mantine/core";
import { useAtom } from "jotai";
import { selectedUserAtom, onlineUsersAtom } from "../../store/atom.js";
import { fetchUserInfo } from "../../utils/commonfunction.js";

import { useSearchParams } from "react-router";
import { useEffect } from "react";

export default function ChatHeader() {
  const [selectedUser, setSelectedUser] = useAtom(selectedUserAtom);
  const [onlineUsers, setOnlineUsers] = useAtom(onlineUsersAtom);
  const isOnline = onlineUsers.includes(selectedUser?._id);
  const [searchParams] = useSearchParams();
  const userId = searchParams.get("userId");
  useEffect(() => {
    const fetchuser = async () => {
      try {
        const data = await fetchUserInfo(userId);

        // 🔥 IMPORTANT: update global state
        setSelectedUser(data);
      } catch (error) {
        console.error("Error fetching user info:", error);
      }
    };

    if (userId) {
      fetchuser();
    }
  }, [userId]);

  return (
    <Group
      p="md"
      style={{ borderBottom: "1px solid var(--mantine-color-default-border)" }}
      justify="space-between"
    >
      <Group>
        <Indicator
          inline
          size={10}
          offset={4}
          position="bottom-end"
          color="green"
          withBorder
          disabled={!onlineUsers.includes(userId)}
        >
          <Avatar
            radius="xl"
            src={selectedUser?.profilePic || null}
            alt={selectedUser?.name || "User"}
          />
        </Indicator>

        <div>
          <Text fw={500}>{selectedUser?.name || "User"}</Text>
          <Text size="xs" c={isOnline ? "success.6" : "gray.5"}>
            {isOnline ? "Online" : "Offline"}
          </Text>
        </div>
      </Group>
    </Group>
  );
}
