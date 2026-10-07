import {
  Modal,
  TextInput,
  Button,
  Stack,
  MultiSelect,
  Textarea,
  NumberInput,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { useEffect, useState } from "react";
import { Alert } from "@mantine/core";
import { Check } from "lucide-react";
import type { UserProfile } from "../store/atom";

export interface EditProfileValues {
  name: string;
  email: string;
  bio: string;
  yearsOfExperience: number;
  skillsOffered: string[];
  skillsToLearn: string[];
}

interface EditProfileModalProps {
  opened: boolean;
  onClose: () => void;
  profile: UserProfile;
  onSave: (values: EditProfileValues) => Promise<boolean>;
  skillsList: { value: string; label: string }[];
  skillsError: boolean;
}

export default function EditProfileModal({
  opened,
  onClose,
  profile,
  onSave,
  skillsList,
  skillsError,
}: EditProfileModalProps) {
  const [saving, setSaving] = useState(false);
  const form = useForm<EditProfileValues>({
    initialValues: {
      name: "",
      bio: "",
      email: "",
      yearsOfExperience: 0,
      skillsOffered: [],
      skillsToLearn: [],
    },
    validate: {
      name: (value) =>
        value.trim().length < 2 ? "Name must have at least 2 letters" : null,
      email: (value) => (/^\S+@\S+\.\S+$/.test(value) ? null : "Invalid email"),
      yearsOfExperience: (value) =>
        value < 0 || value > 60
          ? "Experience must be between 0 and 60 years"
          : null,
    },
  });

  const { setValues, clearErrors } = form;

  useEffect(() => {
    if (opened) {
      setValues({
        name: profile.name || "",
        bio: profile.bio || "",
        email: profile.email || "",
        yearsOfExperience: profile.yearsOfExperience ?? 0,
        skillsOffered: profile.skillsOffered?.map((skill) => skill._id) || [],
        skillsToLearn: profile.skillsToLearn?.map((skill) => skill._id) || [],
      });
      clearErrors();
    }
  }, [opened, profile, setValues, clearErrors]);

  const handleSubmit = async (values: EditProfileValues) => {
    if (saving) return;
    setSaving(true);
    try {
      if (await onSave(values)) onClose();
    } finally {
      setSaving(false);
    }
  };

  return (
    <Modal
      opened={opened}
      onClose={() => {
        if (!saving) onClose();
      }}
      title="Edit profile"
      centered
      radius="md"
      size="lg"
      closeOnClickOutside={!saving}
      closeOnEscape={!saving}
      withCloseButton={!saving}
    >
      <form onSubmit={form.onSubmit(handleSubmit)}>
        <Stack>
          <TextInput
            label="Name"
            {...form.getInputProps("name")}
            disabled={saving}
            required
          />

          <TextInput
            label="Email"
            type="email"
            {...form.getInputProps("email")}
            disabled={saving}
            required
          />

          <NumberInput
            placeholder="Years of experience"
            label="Years of Experience"
            {...form.getInputProps("yearsOfExperience")}
            min={0}
            max={60}
            allowDecimal={false}
            allowNegative={false}
            disabled={saving}
          />

          <Textarea
            label="About me"
            minRows={3}
            autosize
            maxRows={6}
            disabled={saving}
            {...form.getInputProps("bio")}
            maxLength={250}
          />

          {skillsError && (
            <Alert color="yellow" title="Skill catalog unavailable">
              Your existing skills are preserved. Reload your profile to add
              more skills.
            </Alert>
          )}

          <MultiSelect
            label="Skills I can teach"
            data={skillsList || []}
            searchable
            clearable
            disabled={saving || skillsError}
            {...form.getInputProps("skillsOffered")}
          />

          <MultiSelect
            label="Skills I want to learn"
            data={skillsList || []}
            searchable
            clearable
            disabled={saving || skillsError}
            {...form.getInputProps("skillsToLearn")}
          />

          <div className="profile-modal-actions">
            <Button variant="default" onClick={onClose} disabled={saving}>
              Cancel
            </Button>
            <Button
              type="submit"
              loading={saving}
              leftSection={<Check size={17} />}
            >
              Save changes
            </Button>
          </div>
        </Stack>
      </form>
    </Modal>
  );
}
