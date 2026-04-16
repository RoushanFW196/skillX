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
  ThemeIcon,
  Box,
} from "@mantine/core";
import React, { useState, useEffect } from "react";
import {
  Pencil,
  Coins,
  Star,
  MessageSquare,
  HandHeart,
  Target,
  PersonStanding,
  Mountain,
  Cake,
  Waves,
} from "lucide-react";
import { fetchUserInfo } from "../utils/commonfunction.js";
import { FileButton, ActionIcon, Loader } from "@mantine/core";
import EditProfileModal from "./EditProfileModal.tsx";
import { useAtom } from "jotai";
import { loginAtom, userInfoAtom } from "../store/atom.js";
import { toast } from "react-toastify";

export default function ProfilePage() {
  const [opened, setOpened] = useState(false);
  const [isloggedIn, setIsLoggedIn] = useAtom(loginAtom);
  const [user, setUser] = useAtom(userInfoAtom);
  const [profile, setProfile] = useState(null as any);
  const [skillsList, setSkillsList] = useState([]);
  const [uploading, setUploading] = useState(false);
  // Mock icon mapping for skills - in a real app, you might store icon names in DB
  const getSkillIcon = (name: string) => {
    const n = name.toLowerCase();
    if (n.includes("walking")) return <PersonStanding size={14} />;
    if (n.includes("trekking")) return <Mountain size={14} />;
    if (n.includes("pastry")) return <Cake size={14} />;
    if (n.includes("swimming")) return <Waves size={14} />;
    return null;
  };

  const fetchSkills = async () => {
    try {
      const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/skills`);
      const data = await res.json();
      const modifiedskill = data.skills.map((skill: any) => ({
        value: skill._id,
        label: skill.name,
      }));
      setSkillsList(modifiedskill);
    } catch (err) {
      console.error(err);
    }
  };

  const handleSave = async (updatedData: any) => {
    try {
      if (JSON.stringify(updatedData) === JSON.stringify(profile)) {
        toast.info("No changes made");
        return;
      }
      const token = localStorage.getItem("accessToken");
      const userId = profile._id || user?._id;
      const response = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/user/profile/${userId}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(updatedData),
        },
      );

      const respdata = await response.json();
      const data = respdata.data;
      if (!response.ok)
        throw new Error(data.message || "Failed to update profile");

      setProfile(data);
      toast.success("Profile updated successfully 🎉");
    } catch (error: any) {
      toast.error(error.message || "Something went wrong");
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      setIsLoggedIn(true);
      fetchUser();
      fetchSkills();
    } else {
      setIsLoggedIn(false);
    }
  }, []);

  const fetchUser = async () => {
    const token = localStorage.getItem("accessToken");
    try {
      const decodedUser = JSON.parse(atob(token?.split(".")[1] || ""));
      const data = await fetchUserInfo(decodedUser?.id);
      console.log("Fetched user info in header:", data);
      setUser(data);
      setProfile(data); // Set profile state with fetched user info
    } catch (error) {
      console.error("Error fetching user info:", error);
    }
  };

  const handleUpload = async (file: File | null) => {
    if (!file) return;

    const formData = new FormData();
    formData.append("profilePic", file); // Ensure "profilePic" matches your backend field name

    setUploading(true);
    try {
      const token = localStorage.getItem("accessToken");
      const userId = profile._id || user?._id;

      const response = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/user/profile/upload-pic/${userId}`,
        {
          method: "POST", // Or PATCH, depending on your API
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: formData,
        },
      );

      const result = await response.json();
      if (response.ok) {
        // Update the profile state with the new image URL returned by the server
        setProfile({ ...profile, profilePic: result.data.profilePic });
        setUser(result.data); // Update user info in global state if needed
        toast.success("Photo updated! 📸");
      } else {
        throw new Error(result.message || "Upload failed");
      }
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setUploading(false);
    }
  };
  return (
    <div className="max-w-5xl mx-auto p-6">
      <Card
        radius="lg"
        shadow="md"
        p={40}
        withBorder
        style={{
          backgroundColor: "#f8fafc",
          backgroundImage: "radial-gradient(#cbd5e1 0.5px, transparent 0.5px)",
          backgroundSize: "20px 20px",
        }}
      >
        {/* HEADER */}
        <Group justify="space-between" align="center">
          <Group gap="xl">
            <Box style={{ position: "relative" }}>
              <FileButton onChange={handleUpload} accept="image/png,image/jpeg">
                {(props) => (
                  <Avatar
                    {...props}
                    src={
                      profile?.profilePic ||
                      "https://do6gp1uxl3luu.cloudfront.net/profile_pic/6557b8b100617269655ac74b_1776331486096"
                    }
                    size={110}
                    radius="100%"
                    style={{
                      cursor: "pointer",
                      border: "4px solid white",
                      boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)",
                      transition: "filter 0.3s",
                    }}
                    className="hover:brightness-90"
                  />
                )}
              </FileButton>

              {/* SHOW LOADER OVER AVATAR DURING UPLOAD */}
              {uploading && (
                <Box
                  style={{
                    position: "absolute",
                    inset: 0,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    background: "rgba(255,255,255,0.5)",
                    borderRadius: "100%",
                  }}
                >
                  <Loader size="sm" />
                </Box>
              )}
            </Box>

            <Stack gap={2}>
              <Text size="26px" fw={800} c="#1e293b">
                {profile?.name}
              </Text>
              <Text size="md" c="dimmed" mb={5}>
                {profile?.email}
              </Text>
              <Badge
                variant="filled"
                color="#bae6fd"
                styles={{ label: { color: "#0369a1", fontWeight: 700 } }}
                size="lg"
                radius="sm"
              >
                + {profile?.yearsOfExperience} YRS EXPERIENCE
              </Badge>
            </Stack>
          </Group>

          <Button
            variant="outline"
            leftSection={<Pencil size={16} />}
            onClick={() => setOpened(true)}
            radius="md"
            size="md"
            color="blue"
            styles={{ root: { borderWidth: "2px", fontWeight: 600 } }}
          >
            Edit Profile
          </Button>
        </Group>

        {/* BIO */}
        <Text mt={25} size="lg" c="#475569" fw={500}>
          a {profile?.bio || "software engineer"}
        </Text>

        {/* STATS SECTION */}
        <Grid mt={30} gutter="md">
          {[
            {
              label: "Credits",
              value: profile?.credits || 0,
              icon: <Coins size={20} />,
              color: "blue",
            },
            {
              label: "Rating",
              value: profile?.ratingAvg || "—",
              icon: <Star size={20} />,
              color: "teal",
            },
            {
              label: "Reviews",
              value: profile?.ratingCount || 0,
              icon: <MessageSquare size={20} />,
              color: "green",
            },
          ].map((stat, idx) => (
            <Grid.Col key={idx} span={4}>
              <Card
                withBorder
                radius="md"
                p="lg"
                style={{
                  borderLeft: `4px solid var(--mantine-color-${stat.color}-6)`,
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  gap: "20px",
                }}
              >
                <ThemeIcon
                  size={48}
                  radius="md"
                  variant="light"
                  color={stat.color}
                >
                  {stat.icon}
                </ThemeIcon>
                <Stack gap={0} align="center" style={{ flex: 1 }}>
                  <Text fw={800} size="28px" c="#1e293b">
                    {stat.value}
                  </Text>
                  <Text
                    size="sm"
                    fw={600}
                    c="dimmed"
                    style={{ letterSpacing: "0.5px" }}
                  >
                    {stat.label}
                  </Text>
                </Stack>
              </Card>
            </Grid.Col>
          ))}
        </Grid>

        <Divider my={35} color="#e2e8f0" />

        {/* SKILLS SECTION */}
        <Grid>
          <Grid.Col span={6}>
            <Group gap="xs" mb="md">
              <HandHeart size={20} color="#2563eb" />
              <Text fw={800} size="lg" c="#1e293b">
                Skills Offered
              </Text>
            </Group>

            <Group gap="xs">
              {profile?.skillsOffered?.map((skill: any) => (
                <Badge
                  key={skill._id}
                  size="xl"
                  radius="xl"
                  color="blue"
                  variant="filled"
                  leftSection={getSkillIcon(skill.name)}
                  // styles={{
                  //   root: { padding: "18px 20px", textTransform: "uppercase" },
                  // }}
                >
                  {skill.name}
                </Badge>
              ))}
            </Group>
          </Grid.Col>

          <Grid.Col span={6}>
            <Group gap="xs" mb="md">
              <Target size={20} color="#16a34a" />
              <Text fw={800} size="lg" c="#1e293b">
                Skills Wanted
              </Text>
            </Group>

            <Group gap="xs">
              {profile?.skillsToLearn?.map((skill: any) => (
                <Badge
                  key={skill._id}
                  size="xl"
                  radius="xl"
                  color="green"
                  variant="light"
                  leftSection={getSkillIcon(skill.name)}
                >
                  {skill.name}
                </Badge>
              ))}
            </Group>
          </Grid.Col>
        </Grid>
      </Card>

      {/* MODAL */}
      {opened && (
        <EditProfileModal
          opened={opened}
          onClose={() => setOpened(false)}
          profile={profile}
          skillsList={skillsList}
          onSave={handleSave}
        />
      )}
    </div>
  );
}
