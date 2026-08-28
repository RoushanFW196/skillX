import { useState } from "react";
import { Mail, Lock } from "lucide-react";
import { useNavigate } from "react-router";
import { useAtom } from "jotai";
import { loginAtom, userInfoAtom } from "../store/atom.js";
import { toast } from "react-toastify";

export default function Login() {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  const [isloggedIn, setIsLoggedIn] = useAtom(loginAtom);
  const [user, setUser] = useAtom(userInfoAtom);
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/user/login`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(form),
          credentials: "include", // 🔥 MUST for setting cookies from the server
        },
      );
      const data = await response.json();
      //  console.log("Login Response:", data);
      if (data.success && data.status === 200) {
        setUser(data.user);
        setIsLoggedIn(true);
        localStorage.setItem("accessToken", data.user.accessToken);
        localStorage.setItem("userInfo", JSON.stringify(data.user));
        toast.success("Login successful!");
        setTimeout(() => {
          navigate("/");
        }, 2000); // Delay navigation to show toast
      } else {
        toast.error(data.message || "Login failed. Please try again.");
      }
    } catch (error) {
      console.error("Login Error:", error);
      toast.error("Login failed. Please try again.");
    }
  };

  const handleSwitch = () => {
    navigate("/auth/signup"); // Navigate to the signup page
  };

  return (
    <div className="w-full max-w-md mx-auto">
      {/* Card */}
      <div className="bg-white dark:bg-neutral-900 rounded-2xl shadow-lg p-8 border border-neutral-100 dark:border-neutral-800">
        {/* Header */}
        <div className="mb-6 text-center">
          <h2 className="text-2xl font-bold text-neutral-900 dark:text-white">
            Welcome Back 👋
          </h2>
          <p className="text-sm text-neutral-500 dark:text-neutral-400 mt-1">
            Login to continue your journey
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Email */}
          <div>
            <label className="text-sm font-medium text-neutral-700">
              Email
            </label>
            <div className="input-with-icon focus-within:ring-primary-500/30">
              <Mail className="w-4 h-4 text-neutral-400" />
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder="Enter your email"
                className="w-full outline-none ml-2 text-sm"
                required
              />
            </div>
          </div>

          {/* Password */}
          <div>
            <label className="text-sm font-medium text-neutral-700">
              Password
            </label>
            <div className="input-with-icon focus-within:ring-primary-500/30">
              <Lock className="w-4 h-4 text-neutral-400" />
              <input
                type="password"
                name="password"
                value={form.password}
                onChange={handleChange}
                placeholder="Enter your password"
                className="w-full outline-none ml-2 text-sm"
                required
              />
            </div>
          </div>

          {/* Forgot Password */}
          <div className="flex justify-end">
            <button
              type="button"
              className="text-sm text-primary-600 hover:underline font-medium"
            >
              Forgot Password?
            </button>
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="bg-brand-gradient w-full py-2.5 rounded-lg text-white font-semibold shadow-soft hover:shadow-medium hover:scale-[1.01] transition-all"
          >
            Login
          </button>
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

        {/* Footer */}
        <p className="text-sm text-center text-neutral-500 mt-4">
          Don’t have an account?{" "}
          <button
            //onClick={switchToSignup}

            onClick={handleSwitch}
            className="text-primary-600 font-medium hover:underline"
          >
            Sign up
          </button>
        </p>
      </div>
    </div>
  );
}
