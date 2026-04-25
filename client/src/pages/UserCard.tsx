import {
  Card,
  Image,
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
import {
  IconHeart,
  IconStar,
  IconCalendarEvent,
  IconMessageCircle,
  IconBriefcase,
} from "@tabler/icons-react";

function UserCard({ user }) {
  const profilePic =
    user?.user?.profilePic || "https://via.placeholder.com/300";

  return (
    <Card shadow="sm" radius="xl" p={0} withBorder mb="lg">
      <Flex>
        {/* LEFT IMAGE */}
        <Image
          src={profilePic}
          alt={user.user.name}
          w={160}
          h={180}
          fit="cover"
          style={{
            borderTopLeftRadius: "16px",
            borderBottomLeftRadius: "16px",
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
                <Badge color="blue" size="xs">
                  ✔
                </Badge>
              </Group>

              {/* Price */}
              <Badge color="green" variant="light">
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
            style={{
              background: "#eeeff0",
              padding: "10px",
              borderRadius: "10px",
            }}
          >
            <Button
              variant="subtle"
              color="red"
              leftSection={<IconHeart size={16} />}
            >
              Interest
            </Button>

            <Button
              variant="subtle"
              color="yellow"
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
              color="blue"
              leftSection={<IconMessageCircle size={16} />}
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
