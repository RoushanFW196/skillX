import { useEffect, useState } from "react";
import { Container, Title, Text, Loader, Center } from "@mantine/core";
import { useParams } from "react-router";
import UserCard from "./UserCard.tsx";

function UserSkills() {
  const { skillId } = useParams();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchUsers = async () => {
    try {
      const res = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/skills/${skillId}/users`,
      );
      const data = await res.json();
      setUsers(data.users);
    } catch (err) {
      console.error("Error fetching users", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, [skillId]);

  if (loading) {
    return (
      <Center mt="xl">
        <Loader />
      </Center>
    );
  }

  return (
    <Container size="lg">
      <Title mb="md">People who can teach this skill</Title>

      {users.length === 0 ? (
        <Text>No users found for this skill</Text>
      ) : (
        <div>
          {users.map((user) => (
            <UserCard key={user?._id} user={user} />
          ))}
        </div>
      )}
    </Container>
  );
}

export default UserSkills;
