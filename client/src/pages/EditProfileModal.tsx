import {
  Modal,
  TextInput,
  Button,
  Stack,
  MultiSelect,
  Textarea,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { useState,useEffect} from "react";

// const skillsList = [
//   "React",
//   "JavaScript",
//   "Node.js",
//   "DSA",
//   "System Design",
//   "Photography",
//   "Cooking",
//   "Guitar",
// ];

export default function EditProfileModal({
  opened,
  onClose,
  profile,
  onSave,
}: any) {
  const form = useForm({
    initialValues: {
      name: "",
      bio: "",
      email: "",
      skillsOffered: [],
      skillsWanted: [],
    },
    validate: {
      name: (value) =>
        value.length < 2 ? "Name must have at least 2 letters" : null,
      email: (value) => (/^\S+@\S+$/.test(value) ? null : "Invalid email"),
    },
  });
const [skillsList, setSkillsList] = useState([]);
    const fetchSkills = async () => {
    try {
      const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/skills`);
      const data = await res.json();
      return data.skills;
    } catch (err) {
      console.error(err);
    }
  };
 useEffect(() => {
  const loadSkills = async () => {
    const skills = await fetchSkills();
    const names = skills?.map((skill:any) => skill.name);
    setSkillsList(names);
  };
  loadSkills();
}, []);



  // Sync form with profile when modal opens
  useEffect(() => {
    if (profile) {
      form.setValues({
        name: profile.name,
        bio: profile.bio,
        email: profile.email,
        skillsOffered: profile.skillsOffered,
        skillsWanted: profile.skillsWanted,
      });
    }
  }, [profile]);

  const handleSubmit = (values: any) => {
    onSave(values);
    onClose();
  };

  return (
    <Modal
      opened={opened}
      onClose={onClose}
      title="Edit Profile"
      centered
      radius="md"
    >
      <form onSubmit={form.onSubmit(handleSubmit)}>
        <Stack>
          <TextInput label="Name" {...form.getInputProps("name")} disabled />

          <TextInput label="Email" {...form.getInputProps("email")} disabled />

          <Textarea label="Bio" minRows={3} {...form.getInputProps("bio")} />

          <MultiSelect
            label="Skills Offered"
            data={skillsList}
            searchable
            clearable
            {...form.getInputProps("skillsOffered")}
          />

          <MultiSelect
            label="Skills Wanted"
            data={skillsList}
            searchable
            clearable
            {...form.getInputProps("skillsWanted")}
          />

          <Button type="submit" fullWidth mt="md">
            Save Changes
          </Button>
        </Stack>
      </form>
    </Modal>
  );
}
