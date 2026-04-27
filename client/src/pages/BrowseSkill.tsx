import { useEffect, useState } from "react";
import {
  Container,
  Title,
  Text,
  Tabs,
  Card,
  Group,
  ScrollArea,
  Button,
  SimpleGrid,
  TextInput,
  Stack,
  Center,
} from "@mantine/core";

import { IconSearch, IconPlus } from "@tabler/icons-react";
import { categories } from "../utils/constant.js";
import AddSkillModal from "./AddSkillModal.js";
import { toast } from "react-toastify";
import { useNavigate } from "react-router";

function SkillCard({ skill }) {
  const navigate = useNavigate();

  const handleSkillClick = () => {
    navigate(`/app/skills/${skill._id}`);
  };

  return (
    <Card
      shadow="sm"
      radius="xl"
      p="md"
      withBorder
      style={{
        transition: "all 0.2s ease",
        cursor: "pointer",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = "translateY(-4px)";
        e.currentTarget.style.boxShadow = "0 10px 25px rgba(0,0,0,0.08)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = "none";
        e.currentTarget.style.boxShadow = "";
      }}
    >
      <Group justify="space-between" align="flex-start">
        <Group>
          <div>
            <Text fw={600} size="lg">
              {skill.name}
            </Text>

            <Text size="sm" c="dimmed">
              {skill.teacherCount} Mentor
            </Text>
          </div>
        </Group>

        <Button
          variant="light"
          radius="xl"
          size="xs"
          onClick={handleSkillClick}
        >
          View →
        </Button>
      </Group>
    </Card>
  );
}

export default function SkillPage() {
  const [activeTab, setActiveTab] = useState(categories[0].slug);
  const [search, setSearch] = useState("");
  const [opened, setOpened] = useState(false);
  const [allSkills, setAllSkills] = useState([]);

  useEffect(() => {
    getAllSkills();
  }, [activeTab]);

  const filteredSkills =
    allSkills?.filter((skill) =>
      skill.name.toLowerCase().includes(search.toLowerCase()),
    ) || [];

  const handleAddSkill = async (newSkill) => {
    const response = await fetch(
      `${import.meta.env.VITE_API_BASE_URL}/skills/new-skill`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newSkill),
      },
    );

    if (response.ok) {
      const createdSkill = await response.json();
     // console.log("Created Skill:", createdSkill);
      toast.success("Skill added successfully!");
      getAllSkills();
    } else {
      console.error("Failed to add skill");
    }
  };

  const getAllSkills = async () => {
    // fetch all skills from all categories  from the backend and return as a single array

    const response = await fetch(
      `${import.meta.env.VITE_API_BASE_URL}/skills?category=${activeTab}`,
    );
    if (response.ok) {
      const data = await response.json();
      console.log("Fetched Skills:", data);
      setAllSkills(data.skills);
    }
  };

  return (
    <Container size="lg" py="xl">
      {/* 🔹 Header */}
      <Group justify="space-between" mb="lg">
        <div>
          <Title order={2}>Explore Skills</Title>
          <Text c="dimmed">Learn from experts</Text>
        </div>

        <Button
          leftSection={<IconPlus size={16} />}
          radius="md"
          onClick={() => setOpened(true)}
        >
          Add Skill
        </Button>
      </Group>

      {/* 🔹 Categories (Scrollable) */}
      <ScrollArea scrollbarSize={4} offsetScrollbars>
        <Tabs
          value={activeTab}
          onChange={setActiveTab}
          color="indigo"
          variant="pills"
        >
          <Tabs.List
            style={{
              flexWrap: "nowrap",
              whiteSpace: "nowrap",
              gap: 8,
            }}
          >
            {categories.map((cat) => (
              <Tabs.Tab key={cat.slug} value={cat.slug}>
                {cat.name}
              </Tabs.Tab>
            ))}
          </Tabs.List>
        </Tabs>
      </ScrollArea>

      {/* 🔹 Search */}
      <TextInput
        placeholder="Search skills..."
        leftSection={<IconSearch size={16} />}
        value={search}
        onChange={(e) => setSearch(e.currentTarget.value)}
        my="lg"
        radius="md"
      />

      {/* 🔹 Skills Grid */}
      {filteredSkills.length > 0 ? (
        <SimpleGrid cols={{ base: 1, sm: 2, md: 3 }} spacing="lg">
          {filteredSkills.map((skill, i) => (
            <SkillCard key={i} skill={skill} />
          ))}
        </SimpleGrid>
      ) : (
        <Center py="xl">
          <Stack align="center">
            <Text fw={500}>No skills found</Text>
            <Text size="sm" c="dimmed">
              Try searching something else or add a new skill
            </Text>
            <Button
              leftSection={<IconPlus size={16} />}
              radius="md"
              onClick={() => setOpened(true)}
            >
              Add Skill
            </Button>
          </Stack>
        </Center>
      )}

      <AddSkillModal
        opened={opened}
        onClose={() => setOpened(false)}
        categories={categories}
        onAdd={handleAddSkill}
      />
    </Container>
  );
}
