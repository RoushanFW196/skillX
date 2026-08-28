import {
  Card,
  Avatar,
  Text,
  Group,
  Badge,
  Button,
  Flex,
  Divider,
  Rating,
  Stack,
  Box,
} from "@mantine/core";
import { useAtom } from "jotai";
import { userInfoAtom, selectedUserAtom } from "../store/atom.js";
import {
  IconHeart,
  IconStar,
  IconCalendarEvent,
  IconMessageCircle,
  IconBriefcase,
} from "@tabler/icons-react";
import { useNavigate } from "react-router";

function UserCard({ user }) {
  const [loggedinuser, setloggedinUser] = useAtom(userInfoAtom);
  const navigate = useNavigate();
  const [selectedUser, setSelectedUser] = useAtom(selectedUserAtom);

  // console.log("Logged in user in UserCard:", loggedinuser);
  const handleChat = async () => {
    const response = await fetch(
      `${import.meta.env.VITE_API_BASE_URL}/conversations/create`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          senderId: loggedinuser._id, // student's user ID (current logged in user)
          receiverId: user.user._id, // teacher's user ID which can teach the skill the student wants to learn
        }),
      },
    );
    // console.log("Chat creation response:", response);
    if (response.ok) {
      const data = await response.json();
      setSelectedUser(user.user);
      // Optionally, navigate to the chat page or show a success message
      navigate(`/app/chat/${data._id}?userId=${user.user._id}`); // navigate to chat page with conversation ID and selected user ID as query param
    } else {
      console.error("Failed to create chat");
      // Optionally, show an error message to the user
    }
  };

  return (
    <Card shadow="sm" radius="xl" p={0} withBorder mb="lg">
      <Flex>
        {/* LEFT IMAGE — Avatar falls back to initials when no photo */}
        <Avatar
          src={user?.user?.profilePic || null}
          alt={user.user.name}
          w={160}
          h={180}
          radius={0}
          style={{
            borderTopLeftRadius: "16px",
            borderBottomLeftRadius: "16px",
            flexShrink: 0,
          }}
        />

        {/* RIGHT CONTENT */}
        <Box style={{ flex: 1, padding: "18px" }}>
          <Stack gap={6}>
            {/* Top */}
            <Text size="xs" c="dimmed">
              Active recently
            </Text>

            <Group justify="space-between">
              <Group gap={8}>
                <Text fw={700} size="lg">
                  {user.user.name}
                </Text>
                <Badge color="primary" size="xs">
                  ✔
                </Badge>
              </Group>

              {/* Price */}
              <Badge color="success" variant="light">
                ₹{user.pricePerHour || 0}/hr
              </Badge>
            </Group>

            {/* Bio */}
            <Text size="sm" c="dimmed" lineClamp={2}>
              {user.user.bio || "No bio available"}
            </Text>

            {/* Stats */}
            <Group gap="lg" mt={4}>
              <Group gap={4}>
                <IconBriefcase size={14} />
                <Text size="xs">{user.user.yearsOfExperience} yrs exp</Text>
              </Group>

              <Text size="xs">{user.totalSessions} sessions</Text>

              <Group gap={4}>
                <Rating
                  value={user.user.ratingAvg || 0}
                  fractions={2}
                  readOnly
                  size="xs"
                />
                <Text size="xs">({user.user.ratingCount || 0})</Text>
              </Group>
            </Group>
          </Stack>

          {/* Divider */}
          <Divider my="sm" />

          {/* Actions */}
          <Group
            grow
            className="bg-neutral-100 dark:bg-neutral-800 rounded-[10px] p-2.5"
          >
            <Button
              variant="subtle"
              color="danger"
              leftSection={<IconHeart size={16} />}
            >
              Interest
            </Button>

            <Button
              variant="subtle"
              color="accent"
              leftSection={<IconStar size={16} />}
            >
              Save
            </Button>

            <Button
              variant="light"
              color="gray"
              leftSection={<IconCalendarEvent size={16} />}
            >
              Book
            </Button>

            <Button
              variant="light"
              color="primary"
              leftSection={<IconMessageCircle size={16} />}
              onClick={handleChat}
            >
              Chat
            </Button>
          </Group>
        </Box>
      </Flex>
    </Card>
  );
}

export default UserCard;
