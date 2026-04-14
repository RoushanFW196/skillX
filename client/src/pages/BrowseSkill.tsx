import {
  Container,
  Title,
  Text,
  TextInput,
  Select,
  Grid,
  Card,
  Badge,
  Button,
  Group,
  Stack,
  Modal,
  TextInput as Input,
} from "@mantine/core";
import { useEffect, useState } from "react";

export default function ExploreSkills() {
  const [skills, setSkills] = useState([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");

  // Modal state
  const [opened, setOpened] = useState(false);
  const [newSkill, setNewSkill] = useState("");
  const [newCategory, setNewCategory] = useState("");

  useEffect(() => {
    fetchSkills();
  }, []);

  const fetchSkills = async () => {
    try {
      const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/skills`);
      const data = await res.json();
      console.log("Fetched skills:", data);
      setSkills(data.skills);
    } catch (err) {
      console.error(err);
    }
  };

  // Add Skill Function
  const handleAddSkill = async () => {
    if (!newSkill.trim()) return;

    try {
      const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/skills`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: newSkill,
          category: newCategory,
        }),
      });

      const data = await res.json();
      console.log("Added skill:", data);
      // Update UI instantly
      setSkills((prev) => [data.newSkill, ...prev]);

      // Reset
      setNewSkill("");
      setNewCategory("");
      setOpened(false);
    } catch (err) {
      console.error(err);
    }
  };

  const filteredSkills =
    (skills.length > 0 &&
      skills?.filter((skill) => {
        return (
          skill?.name?.toLowerCase().includes(search.toLowerCase()) &&
          (category ? skill.category === category : true)
        );
      })) ||
    [];

  return (
    <Container size="lg" py="xl">
      <Stack gap="xl">
        {/* HEADER */}
        <Group justify="space-between" align="center">
          <div>
            <Title order={2}>Explore Skills</Title>
            <Text color="dimmed" size="sm">
              Discover and add new skills
            </Text>
          </div>

          <Button onClick={() => setOpened(true)}>+ Add Skill</Button>
        </Group>

        {/* SEARCH + FILTER */}
        <Group grow>
          <TextInput
            placeholder="Search skills..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          <Select
            placeholder="Category"
            data={[
              "Technology",
              "Design",
              "Business",
              "Marketing",
              "Finance",
              "Fitness",
              "Sports",
              "Music",
              "Art",
              "Cooking",
              "Language",
              "Education",
              "Personal Development",
              "Lifestyle",
              "Other",
            ]}
            value={category}
            onChange={setCategory}
            clearable
          />
        </Group>

        {/* GRID */}
        <Grid>
          {filteredSkills.length > 0 ? (
            filteredSkills.map((skill) => (
              <Grid.Col span={4} key={skill._id}>
                <Card
                  shadow="sm"
                  padding="lg"
                  radius="lg"
                  withBorder
                  style={{
                    transition: "0.2s",
                    cursor: "pointer",
                  }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.transform = "translateY(-4px)")
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.transform = "translateY(0px)")
                  }
                >
                  <Stack spacing="xs">
                    <Group position="apart">
                      <Text weight={600}>{skill.name}</Text>
                      <Badge variant="light">
                        {skill.category || "General"}
                      </Badge>
                    </Group>

                    <Text size="xs" color="dimmed">
                      Added recently
                    </Text>
                  </Stack>
                </Card>
              </Grid.Col>
            ))
          ) : (
            <Text color="dimmed">No skills found</Text>
          )}
        </Grid>
      </Stack>

      {/* ADD SKILL MODAL */}
      <Modal
        opened={opened}
        onClose={() => setOpened(false)}
        title="Add New Skill"
        centered
      >
        <Stack>
          <Input
            placeholder="Skill name (e.g. React)"
            value={newSkill}
            onChange={(e) => setNewSkill(e.target.value)}
          />

          <Select
            placeholder="Select category"
            data={[
              "Tech",
              "Design",
              "Fitness",
              "Music",
              "Cooking",
              "Lifestyle",
            ]}
            value={newCategory}
            onChange={setNewCategory}
          />

          <Button onClick={handleAddSkill}>Add Skill</Button>
        </Stack>
      </Modal>
    </Container>
  );
}
