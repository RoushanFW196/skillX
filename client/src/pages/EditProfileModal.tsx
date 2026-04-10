import {
  Modal,
  TextInput,
  Button,
  Stack,
  MultiSelect,
  Textarea,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { useEffect } from "react";

const skillsList = [
  "React",
  "JavaScript",
  "Node.js",
  "DSA",
  "System Design",
  "Photography",
  "Cooking",
  "Guitar",
];

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
      email: (value) =>
        /^\S+@\S+$/.test(value) ? null : "Invalid email",
    },
  });

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
          <TextInput label="Name" {...form.getInputProps("name")} />

          <TextInput label="Email" {...form.getInputProps("email")} />

          <Textarea
            label="Bio"
            minRows={3}
            {...form.getInputProps("bio")}
          />

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