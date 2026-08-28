import { TextInput, PasswordInput, Button } from "@mantine/core";
import { useForm, isEmail, hasLength } from "@mantine/form";
import { useAtom } from "jotai";
import { useNavigate } from "react-router";
import { loginAtom, userInfoAtom } from "../store/atom.js";

export default function Signup() {
  const form = useForm({
    initialValues: {
      name: "",
      email: "",
      password: "",
    },
    validate: {
      name: hasLength({ min: 2, max: 60 }, "Name must be 2–60 characters"),
      email: isEmail("Enter a valid email address"),
      password: (value) => {
        if (value.length < 8) return "Password must be at least 8 characters";
        if (!/[A-Z]/.test(value))
          return "Include at least one uppercase letter";
        if (!/[0-9]/.test(value)) return "Include at least one number";
        if (!/[^A-Za-z0-9]/.test(value))
          return "Include at least one special character";
        return null;
      },
    },
    validateInputOnBlur: true, // validate each field as user leaves it
  });
  const navigate = useNavigate();
  const [isloggedIn, setIsLoggedIn] = useAtom(loginAtom);
  const [user, setUser] = useAtom(userInfoAtom);

  const handleSubmit = async (values: typeof form.values) => {
   // console.log("Form values:", values);

    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/user/signup`,
        {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json", // ✅ since no file upload now
          },
          body: JSON.stringify(values),
        },
      );

      const data = await response.json();
    //  console.log("Response:", data);

      if (response.ok) {
        navigate("/");
        setIsLoggedIn(true);
        setUser(data.data); // Store user info in Jotai atom
        localStorage.setItem("accessToken", data.data.accessToken); // Store token in localStorage
      }
    } catch (err) {
      console.error("Signup error:", err);
    }
  };

  const handleSwitch = () => {
    navigate("/auth/login"); // Navigate to the login page
  };

  return (
    <div className="w-full max-w-md mx-auto">
      {/* Card */}
      <div className="bg-white dark:bg-neutral-900 rounded-2xl shadow-lg p-8 border border-neutral-100 dark:border-neutral-800">
        {/* Header */}
        <div className="mb-6 text-center">
          <h2 className="text-2xl font-bold text-neutral-900 dark:text-white">
            Create Account 🚀
          </h2>
          <p className="text-sm text-neutral-500 dark:text-neutral-400 mt-1">
            Start your journey with SkillX
          </p>
        </div>

        <div>
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
              className="bg-brand-gradient w-full py-2.5 rounded-lg text-white font-semibold shadow-soft hover:shadow-medium hover:scale-[1.01] transition-all"
            >
              Sign Up
            </Button>
          </form>

          {/* Divider */}
          <div className="my-6 flex items-center gap-3">
            <div className="flex-1 h-px bg-neutral-200 dark:bg-neutral-700" />
            <span className="text-xs text-neutral-400">OR</span>
            <div className="flex-1 h-px bg-neutral-200 dark:bg-neutral-700" />
          </div>

          {/* Social Login */}
          <button className="w-full border border-neutral-200 dark:border-neutral-700 py-2.5 rounded-lg text-sm font-medium hover:bg-neutral-50 dark:hover:bg-neutral-800 transition flex items-center justify-center gap-2">
            <svg className="w-4 h-4" viewBox="0 0 24 24">
              <path
                fill="#4285F4"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.27-4.74 3.27-8.1z"
              />
              <path
                fill="#34A853"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              />
              <path
                fill="#FBBC05"
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
              />
              <path
                fill="#EA4335"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
              />
            </svg>
            Continue with Google
          </button>

          <p className="text-sm text-center text-neutral-500 mt-4">
            Already have an account?{" "}
            <button
              onClick={handleSwitch}
              className="text-primary-600 font-medium hover:underline"
            >
              Sign in
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}
