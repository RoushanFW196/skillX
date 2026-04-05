import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Login from "./pages/Login";
import Signup from "./pages/Signup";

export default function Auth() {
  const [mode, setMode] = useState<"login" | "signup">("signup");

  return (
    <div className="relative overflow-hidden">
      {/* Title */}
      <div className="text-center mb-4">
        <h2 className="text-xl font-semibold">
          {mode === "login" ? "" : "Create Account 🚀"}
        </h2>
        <p className="text-sm text-neutral-500">
          {mode === "login" ? "" : "Start your journey with SkillSwap"}
        </p>
      </div>

      {/* Animated Forms */}
      <AnimatePresence mode="wait">
        {mode === "login" ? (
          <motion.div
            key="login"
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -40 }}
            transition={{ duration: 0.25 }}
          >
            <Login switchToSignup={() => setMode("signup")} />
          </motion.div>
        ) : (
          <motion.div
            key="signup"
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 40 }}
            transition={{ duration: 0.25 }}
          >
            <Signup switchToLogin={() => setMode("login")} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
