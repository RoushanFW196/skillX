import { useState } from "react";
import { Mail, Lock } from "lucide-react";

export default function Login({ switchToSignup }: any) {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Login Data:", form);
  };

  return (
    <div className="w-full max-w-md mx-auto">
      {/* Card */}
      <div className="bg-white rounded-2xl shadow-lg p-8 border border-neutral-100">
        
        {/* Header */}
        <div className="mb-6 text-center">
          <h2 className="text-2xl font-bold text-neutral-900">
            Welcome Back 👋
          </h2>
          <p className="text-sm text-neutral-500 mt-1">
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
            <div className="mt-1 flex items-center border rounded-lg px-3 py-2 focus-within:ring-2 focus-within:ring-indigo-500">
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
            <div className="mt-1 flex items-center border rounded-lg px-3 py-2 focus-within:ring-2 focus-within:ring-indigo-500">
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
              className="text-sm text-indigo-600 hover:underline"
            >
              Forgot Password?
            </button>
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full py-2.5 rounded-lg bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold shadow-md hover:shadow-lg hover:scale-[1.01] transition-all"
          >
            Login
          </button>
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

        {/* Footer */}
        <p className="text-sm text-center text-neutral-500 mt-4">
        Don’t have an account?{" "}
        <button
          onClick={switchToSignup}
          className="text-indigo-600 font-medium hover:underline"
        >
          Sign up
        </button>
      </p>
      </div>
    </div>
  );
}