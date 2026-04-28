import { Group, Avatar, Text } from "@mantine/core";
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
      style={{ borderBottom: "1px solid #eee" }}
      justify="space-between"
    >
      <Group>
        <Avatar
          radius="xl"
          src={selectedUser?.profilePic || "https://via.placeholder.com/300"}
        />
        <div>
          <Text fw={500}>{selectedUser?.name || "User"}</Text>
          <Text size="xs" c={isOnline ? "green" : "gray"}>
            {isOnline ? "Online" : "Offline"}
          </Text>
        </div>
      </Group>
    </Group>
  );
}
