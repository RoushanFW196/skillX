import {
  Avatar,
  Button,
  Card,
  Text,
  Badge,
  Group,
  Stack,
  Divider,
  Grid,
} from "@mantine/core";
import { useState } from "react";
import EditProfileModal from "./EditProfileModal.tsx";

export default function ProfilePage() {
  const [opened, setOpened] = useState(false);

  const [profile, setProfile] = useState({
    bio: "Software engineer with a passion for open source.",
    skillsOffered: ["React", "JavaScript", "Guitar", "Cooking"],
    skillsWanted: ["DSA", "System Design", "Photography", "Hiking"],
    name: "Roushan Kumar",
    email: "roushan@gmail.com",
    phone: "74833337925",
    yearsOfExperience: 3,
    profilePic:
      "https://res.cloudinary.com/docsqsajw/image/upload/v1775674675/SkillX/profilePics/nt2hoznoyi5ckq7qc9qi.jpg",
    credits: 0,
    ratingAvg: 0,
    ratingCount: 0,
  });

  const handleSave = (updatedData: any) => {
    setProfile((prev) => ({
      ...prev,
      ...updatedData,
    }));
  };

  return (
    <div className="max-w-5xl mx-auto p-6">
      <Card radius="lg" shadow="sm" p="xl" withBorder>
        {/* HEADER */}
        <Group justify="space-between" align="flex-start">
          <Group>
            <Avatar src={profile.profilePic} size={80} radius="50%" />

            <div>
              <Text size="xl" fw={700}>
                {profile.name}
              </Text>

              <Text size="sm" c="dimmed">
                {profile.email}
              </Text>

              <Badge mt={6} variant="light" color="blue">
                {profile.yearsOfExperience}+ yrs experience
              </Badge>
            </div>
          </Group>

          <Button variant="outline" onClick={() => setOpened(true)}>
            Edit Profile
          </Button>
        </Group>

        {/* BIO */}
        <Text mt="md" c="dimmed">
          {profile.bio}
        </Text>

        {/* STATS */}
        <Grid mt="lg">
          <Grid.Col span={4}>
            <Card withBorder radius="md" p="md">
              <Stack align="center" gap={4}>
                <Text fw={700} size="lg">
                  {profile.credits}
                </Text>
                <Text size="xs" c="dimmed">
                  Credits
                </Text>
              </Stack>
            </Card>
          </Grid.Col>

          <Grid.Col span={4}>
            <Card withBorder radius="md" p="md">
              <Stack align="center" gap={4}>
                <Text fw={700} size="lg">
                  {profile.ratingAvg || "—"}
                </Text>
                <Text size="xs" c="dimmed">
                  Rating
                </Text>
              </Stack>
            </Card>
          </Grid.Col>

          <Grid.Col span={4}>
            <Card withBorder radius="md" p="md">
              <Stack align="center" gap={4}>
                <Text fw={700} size="lg">
                  {profile.ratingCount}
                </Text>
                <Text size="xs" c="dimmed">
                  Reviews
                </Text>
              </Stack>
            </Card>
          </Grid.Col>
        </Grid>

        <Divider my="lg" />

        {/* SKILLS */}
        <Grid>
          <Grid.Col span={6}>
            <Text fw={600} mb="sm">
              Skills Offered
            </Text>

            <Group>
              {profile.skillsOffered.map((skill) => (
                <Badge key={skill} size="md" radius="xl">
                  {skill}
                </Badge>
              ))}
            </Group>
          </Grid.Col>

          <Grid.Col span={6}>
            <Text fw={600} mb="sm">
              Skills Wanted
            </Text>

            <Group>
              {profile.skillsWanted.map((skill) => (
                <Badge
                  key={skill}
                  size="md"
                  radius="xl"
                  color="green"
                  variant="light"
                >
                  {skill}
                </Badge>
              ))}
            </Group>
          </Grid.Col>
        </Grid>
      </Card>

      {/* MODAL */}
      <EditProfileModal
        opened={opened}
        onClose={() => setOpened(false)}
        profile={profile}
        onSave={handleSave}
      />
    </div>
  );
}
