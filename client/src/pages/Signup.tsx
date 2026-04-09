import {
  TextInput,
  PasswordInput,
  NumberInput,
  Button,
  MultiSelect,
  FileInput,
} from "@mantine/core";
import {
  useForm,
  isEmail,
  isNotEmpty,
  hasLength,
  matchesField,
} from "@mantine/form";
import { useNavigate } from "react-router";

const MB = 1024 * 1024;
const ALLOWED_TYPES = ["image/jpeg", "image/png", "image/webp"];

export default function Signup({ switchToLogin }: any) {
  const form = useForm({
    initialValues: {
      name: "",
      email: "",
      phone: "",
      password: "",
      confirmPassword: "",
      yearsOfExperience: 0,
      skillsOffered: [] as string[],
      skillsToLearn: [] as string[],
      profilePic: null as File | null,
    },

    validate: {
      name: hasLength({ min: 2, max: 60 }, "Name must be 2–60 characters"),

      email: isEmail("Enter a valid email address"),

      phone: (value) =>
        /^\+?[0-9]{7,15}$/.test(value.trim())
          ? null
          : "Enter a valid phone number (7–15 digits)",

      password: (value) => {
        if (value.length < 8) return "Password must be at least 8 characters";
        if (!/[A-Z]/.test(value))
          return "Include at least one uppercase letter";
        if (!/[0-9]/.test(value)) return "Include at least one number";
        if (!/[^A-Za-z0-9]/.test(value))
          return "Include at least one special character";
        return null;
      },

      confirmPassword: matchesField("password", "Passwords do not match"),

      yearsOfExperience: (value) =>
        value < 0 || value > 60 ? "Enter a value between 0 and 60" : null,

      skillsOffered: (value) =>
        value.length === 0 ? "Select at least one skill you can offer" : null,

      skillsToLearn: (value, values) => {
        if (value.length === 0) return "Select at least one skill to learn";
        const overlap = value.filter((s) => values.skillsOffered.includes(s));
        if (overlap.length > 0)
          return `You can't learn what you already offer: ${overlap.join(", ")}`;
        return null;
      },

      profilePic: (file: File | null) => {
        if (!file) return "Profile picture is required";
        if (!ALLOWED_TYPES.includes(file.type))
          return "Only JPG, PNG, or WebP allowed";
        if (file.size > 2 * MB) return "File must be under 2 MB";
        return null;
      },
    },

    validateInputOnBlur: true, // validate each field as user leaves it
  });
  const navigate = useNavigate();
  const handleSubmit = async (values: typeof form.values) => {
    // File uploads need multipart/form-data, not JSON
    const body = new FormData();
    body.append("name", values.name);
    body.append("email", values.email);

    body.append("password", values.password);

    const response = await fetch(
      `${import.meta.env.VITE_API_BASE_URL}/user/signup`,
      {
        method: "POST",
        body,
      },
    );
    const data = await response.json();
    console.log(data);
  };

  const handleSwitch = () => {
    navigate("/auth/login"); // Navigate to the login page
  };

  return (
    <div className="w-full max-w-md mx-auto">
      {/* Card */}
      <div className="bg-white rounded-2xl shadow-lg p-8 border border-neutral-100">
        {/* Header */}
        <div className="mb-6 text-center">
          <h2 className="text-2xl font-bold text-neutral-900">
            Create Account 🚀
          </h2>
          <p className="text-sm text-neutral-500 mt-1">
            Start your journey with SkillSwap
          </p>
        </div>

        <div className="w-full max-w-lg bg-white rounded-2xl  p-6">
          <form onSubmit={form.onSubmit(handleSubmit)} className="space-y-4">
            <TextInput
              label="Full Name"
              placeholder="Enter your name"
              withAsterisk
              {...form.getInputProps("name")}
            />
            <TextInput
              label="Email"
              placeholder="Enter your email"
              withAsterisk
              {...form.getInputProps("email")}
            />

            <PasswordInput
              label="Password"
              placeholder="Min 8 chars, 1 upper, 1 number, 1 special"
              withAsterisk
              {...form.getInputProps("password")}
            />

            <Button
              type="submit"
              fullWidth
              className="w-full py-2.5 rounded-lg bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold shadow-md hover:shadow-lg hover:scale-[1.01] transition-all"
            >
              Sign Up
            </Button>
          </form>

          {/* Divider */}
          <div className="my-6 flex items-center gap-3">
            <div className="flex-1 h-px bg-neutral-200" />
            <span className="text-xs text-neutral-400">OR</span>
            <div className="flex-1 h-px bg-neutral-200" />
          </div>

          {/* Social Login */}
          <button className="w-full border border-neutral-200 py-2.5 rounded-lg text-sm font-medium hover:bg-neutral-50 transition">
            Continue with Google
          </button>

          <p className="text-sm text-center text-neutral-500 mt-4">
            Already have an account?{" "}
            <button
              onClick={handleSwitch}
              className="text-indigo-600 font-medium hover:underline"
            >
              Sign in
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}
