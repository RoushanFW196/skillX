import {
  TextInput,
  PasswordInput,
  NumberInput,
  Button,
  Badge,
  MultiSelect,
} from "@mantine/core";
import { useForm } from "@mantine/form";

const LEVELS = ["Beginner", "Intermediate", "Advanced"];

export default function Signup({ switchToLogin }: any) {
  const form = useForm({
    initialValues: {
      name: "",
      email: "",
      phone: "",
      password: "",
      yearsOfExperience: 0,
      skillsOffered: [],
      skillsToLearn: [],
    },
  });

  const handleSubmit = async (values: any) => {
    console.log(values);
    const response = await fetch(
      `${import.meta.env.VITE_API_BASE_URL}/user/signup`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      },
    );
    const data = await response.json();
    console.log(data);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="w-full max-w-lg bg-white rounded-2xl shadow-lg p-6">
        <form onSubmit={form.onSubmit(handleSubmit)} className="space-y-4">
          {/* Basic Fields */}
          <TextInput
            label="Full Name"
            placeholder="Enter your name"
            {...form.getInputProps("name")}
          />

          <TextInput
            label="Email"
            placeholder="Enter your email"
            {...form.getInputProps("email")}
          />

          <TextInput
            label="Phone"
            placeholder="Enter phone number"
            {...form.getInputProps("phone")}
          />

          <PasswordInput
            label="Password"
            placeholder="Enter password"
            {...form.getInputProps("password")}
          />

          <NumberInput
            label="Years of Experience"
            placeholder="Enter experience"
            {...form.getInputProps("yearsOfExperience")}
          />

          {/* Skill Input */}
          <MultiSelect
            label="Skills Offered"
            placeholder="Pick value"
            data={["React", "Angular", "Vue", "Svelte"]}
            {...form.getInputProps("skillsOffered")}
          />

          <MultiSelect
            label="Skills wants to learn"
            placeholder="Pick value"
            data={["Guitar", "React", "Angular", "Vue", "Svelte"]}
            {...form.getInputProps("skillsToLearn")}
          />

          {/* Submit */}
          <Button type="submit" fullWidth>
            Sign Up
          </Button>
        </form>
         <p className="text-sm text-center text-neutral-500 mt-4">
        Already have an account?{" "}
        <button
          onClick={switchToLogin}
          className="text-indigo-600 font-medium hover:underline"
        >
          Sign in
        </button>
      </p>
      </div>
    </div>
  );
}
