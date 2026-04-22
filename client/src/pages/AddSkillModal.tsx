import { useState } from "react";
import { Modal, TextInput, Select, Button, Stack } from "@mantine/core";

export default function AddSkillModal({ opened, onClose, onAdd, categories }) {
  const [form, setForm] = useState({
    name: "",
    category: "",
  });

  const handleChange = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = () => {
    // basic validation
    if (!form.name || !form.category) return;
    onAdd(form);
    // reset form
    setForm({
      name: "",
      category: "",
    });
    onClose();
  };

  return (
    <Modal opened={opened} onClose={onClose} title="Add New Skill" centered>
      <Stack>
        <TextInput
          label="Skill Name"
          placeholder="e.g. React.js"
          value={form.name}
          onChange={(e) => handleChange("name", e.currentTarget.value)}
          required
        />

        <Select
          label="Category"
          placeholder="Select category"
          data={categories.map((c) => ({
            value: c.slug,
            label: c.name,
          }))}
          value={form.category}
          onChange={(value) => handleChange("category", value)}
          required
        />

        <Button onClick={handleSubmit}>Add Skill</Button>
      </Stack>
    </Modal>
  );
}
