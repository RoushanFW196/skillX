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
import React, { useState } from "react";
import EditProfileModal from "./EditProfileModal.tsx";
import { useAtom } from "jotai";
import { loginAtom, userInfoAtom } from "../store/atom.js";
import { useEffect } from "react";
import { toast } from "react-toastify";

export default function ProfilePage() {
  const [opened, setOpened] = useState(false);
  const [isloggedIn, setIsLoggedIn] = useAtom(loginAtom);
  const [user, setUser] = useAtom(userInfoAtom);

  const [profile, setProfile] = useState(null as any);

  const [skillsList, setSkillsList] = useState([]);
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
      if (!token) {
        throw new Error("User not authenticated");
      }
      const userId = profile._id || user?._id; // Get user ID from profile or Jotai atom
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
      if (!response.ok) {
        throw new Error(data.message || "Failed to update profile");
      }

      // ✅ Update state ONLY after success
      setProfile(() => ({
        _id: data._id,
        bio: data.bio,
        skillsOffered: data.skillsOffered,
        skillsToLearn: data.skillsToLearn,
        name: data.name,
        email: data.email,
        phone: data.phone,
        yearsOfExperience: data.yearsOfExperience,
        profilePic: data.profilePic,
        credits: data.credits,
        ratingAvg: data.ratingAvg,
        ratingCount: data.ratingCount,
      }));

      // ✅ Toast success
      toast.success("Profile updated successfully 🎉");
    } catch (error: any) {
      console.error("Update Error:", error);

      // ❌ Show error toast
      toast.error(error.message || "Something went wrong");
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      setIsLoggedIn(true);
      fetchProfile(); // Fetch user profile on app load if token exists
      fetchSkills(); // Fetch skills list on app load
    } else {
      setIsLoggedIn(false);
    }
  }, []);

  const fetchProfile = async () => {
    const token = localStorage.getItem("accessToken");
    const user = JSON.parse(atob(token?.split(".")[1]));
    setUser(user); // Store user info in Jotai atom for global access
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/user/profile/${user?.id}`,
        {
          method: "GET",
          credentials: "include",
        },
      );
      const respdata = await response.json();
      const data = respdata.data;

      if (response.ok) {
        setProfile(() => ({
          _id: data._id,
          bio: data.bio,
          skillsOffered: data.skillsOffered,
          skillsToLearn: data.skillsToLearn,
          name: data.name,
          email: data.email,
          phone: data.phone,
          yearsOfExperience: data.yearsOfExperience,
          profilePic: data.profilePic,
          credits: data.credits,
          ratingAvg: data.ratingAvg,
          ratingCount: data.ratingCount,
        }));
      }
    } catch (error) {
      console.error("Profile Fetch Error:", error);
    }
  };

  return (
    <div className="max-w-5xl mx-auto p-6">
      <Card radius="lg" shadow="sm" p="xl" withBorder>
        {/* HEADER */}
        <Group justify="space-between" align="flex-start">
          <Group>
            <Avatar
              src={
                "https://do6gp1uxl3luu.cloudfront.net/profile_pic/6557b8b100617269655ac74b_1776331486096"
              }
              size={80}
              radius="50%"
            />

            <div>
              <Text size="xl" fw={700}>
                {profile?.name}
              </Text>

              <Text size="sm" c="dimmed">
                {profile?.email}
              </Text>

              <Badge mt={6} variant="light" color="blue">
                {profile?.yearsOfExperience}+ yrs experience
              </Badge>
            </div>
          </Group>

          <Button variant="outline" onClick={() => setOpened(true)}>
            Edit Profile
          </Button>
        </Group>

        {/* BIO */}
        <Text mt="md" c="dimmed">
          {profile?.bio}
        </Text>

        {/* STATS */}
        <Grid mt="lg">
          <Grid.Col span={4}>
            <Card withBorder radius="md" p="md">
              <Stack align="center" gap={4}>
                <Text fw={700} size="lg">
                  {profile?.credits}
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
                  {profile?.ratingAvg || "—"}
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
                  {profile?.ratingCount}
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
              {profile?.skillsOffered?.map((skill) => (
                <Badge key={skill._id} size="md" radius="xl">
                  {skill.name}
                </Badge>
              ))}
            </Group>
          </Grid.Col>

          <Grid.Col span={6}>
            <Text fw={600} mb="sm">
              Skills Wanted
            </Text>

            <Group>
              {profile?.skillsToLearn?.map((skill) => (
                <Badge
                  key={skill._id}
                  size="md"
                  radius="xl"
                  color="green"
                  variant="light"
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
