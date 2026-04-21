import { useState } from "react";
import {
  Container,
  Title,
  TextInput,
  Tabs,
  Card,
  Text,
  Badge,
  Group,
  Button,
  SimpleGrid,
  ScrollArea,
} from "@mantine/core";
import { IconSearch, IconPlus } from "@tabler/icons-react";

const categories = {
  tech: ["Programming", "Data Science", "AI & ML", "DevOps"],
  creative: ["Design", "Photography", "Video Editing"],
  business: ["Marketing", "Finance", "Sales"],
  fitness: ["Yoga", "Gym", "Running"],
};

const skills = [
  { name: "Software Development", category: "tech", learners: 120 },
  { name: "Mathematics", category: "tech", learners: 80 },
  { name: "Piano", category: "creative", learners: 60 },
  { name: "Guitar", category: "creative", learners: 75 },
  { name: "Marketing Basics", category: "business", learners: 90 },
  { name: "Yoga", category: "fitness", learners: 150 },
];

function SkillCard({ skill }) {
  return (
    <Card
      shadow="sm"
      radius="lg"
      p="md"
      withBorder
      style={{ transition: "0.2s" }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = "translateY(-5px)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = "translateY(0px)";
      }}
    >
      <Group justify="space-between">
        <Text fw={600}>{skill.name}</Text>
        <Badge variant="light">{skill.category}</Badge>
      </Group>

      <Text size="sm" c="dimmed" mt="xs">
        Learn and master this skill
      </Text>

      <Group mt="md" justify="space-between">
        <Text size="xs">🔥 {skill.learners} learners</Text>
        <Button size="xs" variant="light">
          Explore
        </Button>
      </Group>
    </Card>
  );
}

export default function ExploreSkills() {
  const [activeTab, setActiveTab] = useState("tech");
  const [search, setSearch] = useState("");

  const filteredSkills = skills.filter(
    (skill) =>
      skill.category === activeTab &&
      skill.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <Container size="lg" py="xl">
      <Group justify="space-between" mb="md">
        <div>
          <Title order={2}>Explore Skills</Title>
          <Text c="dimmed">Discover and learn new skills</Text>
        </div>

        <Button leftSection={<IconPlus size={16} />}>
          Add Skill
        </Button>
      </Group>

      <Tabs value={activeTab} onChange={setActiveTab} mb="md">
        <Tabs.List>
          <Tabs.Tab value="tech">Tech</Tabs.Tab>
          <Tabs.Tab value="creative">Creative</Tabs.Tab>
          <Tabs.Tab value="business">Business</Tabs.Tab>
          <Tabs.Tab value="fitness">Fitness</Tabs.Tab>
        </Tabs.List>
      </Tabs>

      <TextInput
        placeholder="Search skills..."
        leftSection={<IconSearch size={16} />}
        value={search}
        onChange={(e) => setSearch(e.currentTarget.value)}
        mb="lg"
      />

      <Title order={4} mb="sm">
        🔥 Popular Skills
      </Title>
      <ScrollArea mb="lg">
        <Group>
          {skills.slice(0, 4).map((skill, i) => (
            <SkillCard key={i} skill={skill} />
          ))}
        </Group>
      </ScrollArea>

      <Title order={4} mb="sm">
        All Skills
      </Title>

      <SimpleGrid cols={{ base: 1, sm: 2, md: 3 }} spacing="lg">
        {filteredSkills.map((skill, i) => (
          <SkillCard key={i} skill={skill} />
        ))}
      </SimpleGrid>
    </Container>
  );
}
