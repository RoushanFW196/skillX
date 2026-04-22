import { useState } from "react";
import {
  Container,
  Title,
  Text,
  Tabs,
  Card,
  Badge,
  Group,
  ScrollArea,
  Button,
  SimpleGrid,
  TextInput,
  Avatar,
  Rating,
  Stack,
  Center,
} from "@mantine/core";

import { IconSearch, IconPlus } from "@tabler/icons-react";
import { categories } from "../utils/constant.js";
import AddSkillModal from "./AddSkillModal.js";

function SkillCard({ skill }) {
  return (
    <Card
      shadow="sm"
      radius="xl"
      p="md"
      withBorder
      style={{ transition: "0.2s", cursor: "pointer" }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = "translateY(-6px)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = "translateY(0px)";
      }}
    >
      <Group mb="sm">
        <Avatar radius="xl" />
        <div>
          <Text size="sm" fw={600}>
            {skill.user}
          </Text>
          <Text size="xs" c="dimmed">
            {skill.learners} learners
          </Text>
        </div>
      </Group>

      <Text fw={600} mt="xs" size="lg">
        {skill.name}
      </Text>

      <Group mt="xs">
        <Rating value={skill.rating} fractions={2} readOnly size="sm" />
        <Text size="xs">{skill.rating}</Text>
      </Group>

      <Group mt="md" justify="space-between">
        <Badge color="green" variant="light">
          {skill.price} credits/hr
        </Badge>
        <Button size="xs" radius="md">
          View
        </Button>
      </Group>
    </Card>
  );
}

export default function SkillPage() {
  const [activeTab, setActiveTab] = useState(categories[0].slug);
  const [search, setSearch] = useState("");
  const [opened, setOpened] = useState(false);
  const currentCategory = categories.find((cat) => cat.slug === activeTab);

  const filteredSkills =
    currentCategory?.skills?.filter((skill) =>
      skill.name.toLowerCase().includes(search.toLowerCase()),
    ) || [];

  return (
    <Container size="lg" py="xl">
      {/* 🔹 Header */}
      <Group justify="space-between" mb="lg">
        <div>
          <Title order={2}>Explore Skills</Title>
          <Text c="dimmed">Learn from experts or teach others</Text>
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
        <Tabs value={activeTab} onChange={setActiveTab}>
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
        onAdd={(newSkill) => {
          console.log("New Skill:", newSkill);

          // // 🔥 TEMP: local update (replace with API later)
          // const category = categories.find((c) => c.slug === newSkill.category);
          // if (category) {
          //   category.skills.push({
          //     ...newSkill,
          //     user: "You",
          //     learners: 0,
          //     rating: 0,
          //   });
          // }
        }}
      />
    </Container>
  );
}
