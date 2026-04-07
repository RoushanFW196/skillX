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

  const handleSubmit = async (values: typeof form.values) => {
    // File uploads need multipart/form-data, not JSON
    const body = new FormData();
    body.append("name", values.name);
    body.append("email", values.email);
    body.append("phone", values.phone);
    body.append("password", values.password);
    body.append("yearsOfExperience", String(values.yearsOfExperience));
    body.append("skillsOffered", JSON.stringify(values.skillsOffered));
    body.append("skillsToLearn", JSON.stringify(values.skillsToLearn));
    if (values.profilePic) body.append("profilePic", values.profilePic);

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

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="w-full max-w-lg bg-white rounded-2xl shadow-lg p-6">
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
          <TextInput
            label="Phone"
            placeholder="+91 9876543210"
            withAsterisk
            {...form.getInputProps("phone")}
          />
          <PasswordInput
            label="Password"
            placeholder="Min 8 chars, 1 upper, 1 number, 1 special"
            withAsterisk
            {...form.getInputProps("password")}
          />
          <PasswordInput
            label="Confirm Password"
            placeholder="Repeat your password"
            withAsterisk
            {...form.getInputProps("confirmPassword")}
          />
          <NumberInput
            label="Years of Experience"
            placeholder="0–60"
            min={0}
            max={60}
            withAsterisk
            {...form.getInputProps("yearsOfExperience")}
          />
          <MultiSelect
            label="Skills Offered"
            placeholder="Pick skills you can teach"
            data={["React", "Angular", "Vue", "Svelte"]}
            withAsterisk
            {...form.getInputProps("skillsOffered")}
          />
          <MultiSelect
            label="Skills to Learn"
            placeholder="Pick skills you want to learn"
            data={["Guitar", "React", "Angular", "Vue", "Svelte"]}
            withAsterisk
            {...form.getInputProps("skillsToLearn")}
          />
          <FileInput
            clearable
            label="Profile Picture"
            placeholder="JPG, PNG or WebP · max 2 MB"
            accept="image/jpeg,image/png,image/webp"
            withAsterisk
            {...form.getInputProps("profilePic")}
          />

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
