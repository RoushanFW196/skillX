import { useAtom } from "jotai";
import { motion } from "framer-motion";
import { Zap, Menu, Sun, Moon, LogOut, User, Inbox } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { useMediaQuery, useDisclosure } from "@mantine/hooks";
import { loginAtom, userInfoAtom } from "../../store/atom.js";
import { Avatar, Drawer, NavLink, Popover } from "@mantine/core";
import { toast } from "react-toastify";
import { fetchUserInfo } from "../../utils/commonfunction.js";

export function Header() {
  const [darkMode, setDarkMode] = useState(false);
  const [isloggedIn, setIsLoggedIn] = useAtom(loginAtom);
  const navigate = useNavigate();
  const [user, setUser] = useAtom(userInfoAtom);
  const isMobile = useMediaQuery("(max-width: 768px)", true);
  const [opened, { open, close }] = useDisclosure(false);

  const handleStart = () => navigate("/auth/login");

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      setIsLoggedIn(true);
      fetchUser();
    }
  }, []);

  const fetchUser = async () => {
    try {
      const token = localStorage.getItem("accessToken");
      const decodedUser = JSON.parse(atob(token?.split(".")[1] || ""));
      const data = await fetchUserInfo(decodedUser?.id);
      setUser(data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleLogout = async () => {
    const res = await fetch(
      `${import.meta.env.VITE_API_BASE_URL}/user/logout`,
      { method: "POST", credentials: "include" },
    );

    if (res.ok) {
      localStorage.removeItem("accessToken");
      setIsLoggedIn(false);
      toast.success("Logged out successfully!");
      navigate("/");
    }
  };

  // useEffect(() => {
  //   const savedTheme = localStorage.getItem("theme");
  //   setDarkMode(savedTheme === "dark");
  // }, []);

  // useEffect(() => {
  //   if (darkMode) {
  //     document.documentElement.classList.add("dark");
  //   } else {
  //     document.documentElement.classList.remove("dark");
  //   }

  //   localStorage.setItem("theme", darkMode ? "dark" : "light");
  // }, [darkMode]);

  const toggleTheme = () => {
    setDarkMode((prev) => !prev);
  };

  // useEffect(() => {
  //   localStorage.setItem("theme", darkMode ? "dark" : "light");
  // }, [darkMode]);

  return (
    <header className="sticky top-0 z-50 backdrop-blur-md bg-white/80 dark:bg-neutral-900/80 border-b dark:border-neutral-800">
      {" "}
      <nav className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* 🔥 Logo */}
          <div
            onClick={() => navigate("/")}
            className="flex items-center gap-2 cursor-pointer"
          >
            <div className="w-8 h-8 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-lg flex items-center justify-center">
              <Zap className="w-4 h-4 text-white" />
            </div>
            <span className="text-lg font-bold text-neutral-900 dark:text-white">
              SkillX
            </span>
          </div>

          {/* ✅ Desktop Nav */}
          {!isMobile && (
            <div className="flex items-center gap-4  justify-center">
              <NavLink label="Browse Skills" href="/app/explore-skills" />
              <NavLink label="Matches" />
              <NavLink label="Community" />
              <NavLink label="About" />
            </div>
          )}

          {/* ✅ Desktop Right */}
          <div className="hidden md:flex items-center gap-3">
            {/* Theme */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-md hover:bg-gray-100"
            >
              {darkMode ? <Sun size={18} /> : <Moon size={18} />}
            </button>

            {isloggedIn ? (
              <Popover width={200} position="bottom" withArrow shadow="md">
                <Popover.Target>
                  <Avatar src={user?.profilePic || null} />
                </Popover.Target>

                <Popover.Dropdown>
                  <button
                    onClick={() => navigate("/app/profile")}
                    className="flex gap-2 w-full p-2 hover:bg-gray-100 rounded"
                  >
                    <User size={16} /> Profile
                  </button>

                  <button
                    onClick={() => navigate("/app/chat")}
                    className="flex gap-2 w-full p-2 hover:bg-gray-100 rounded"
                  >
                    <Inbox size={16} /> Messages
                  </button>

                  <button
                    onClick={handleLogout}
                    className="flex gap-2 w-full p-2 text-red-500 hover:bg-red-50 rounded"
                  >
                    <LogOut size={16} /> Logout
                  </button>
                </Popover.Dropdown>
              </Popover>
            ) : (
              <button
                onClick={handleStart}
                className="px-4 py-2 bg-indigo-600 text-white rounded-lg"
              >
                Get Started
              </button>
            )}
          </div>

          {isMobile && (
            <div className="flex items-center">
              <button onClick={toggleTheme} className="mr-3">
                {darkMode ? <Sun size={18} /> : <Moon size={18} />}
              </button>

              <button onClick={open}>
                <Menu size={22} />
              </button>
            </div>
          )}
        </div>
      </nav>
      {isMobile && (
        <Drawer
          opened={opened}
          onClose={close}
          position="right"
          size="85%"
          padding="0"
          overlayProps={{ opacity: 0.4, blur: 6 }}
        >
          <motion.div
            initial={{ x: 100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: 100, opacity: 0 }}
            transition={{ type: "spring", stiffness: 260, damping: 25 }}
            className="flex flex-col h-full bg-white"
          >
            {/* 👤 USER HEADER */}
            {isloggedIn && (
              <div className="flex items-center gap-3 p-5 border-b">
                <Avatar src={user?.profilePic || null} size="lg" />
                <div>
                  <p className="font-semibold text-sm">
                    {user?.name || "User"}
                  </p>
                  <p className="text-xs text-gray-500">Welcome back 👋</p>
                </div>
              </div>
            )}

            {/* 📌 NAV LINKS */}
            <div className="flex flex-col p-4 gap-2">
              {[
                {
                  label: "Browse Skills",
                  icon: <Zap size={18} />,
                  path: "/app/explore-skills",
                },
                {
                  label: "Matches",
                  icon: <User size={18} />,
                  path: "/app/matches",
                },
                {
                  label: "Community",
                  icon: <Inbox size={18} />,
                  path: "/app/community",
                },
                { label: "About", icon: <User size={18} />, path: "/about" },
              ].map((item) => (
                <motion.button
                  key={item.label}
                  whileTap={{ scale: 0.96 }}
                  onClick={() => {
                    navigate(item.path);
                    close();
                  }}
                  className="flex items-center gap-3 p-3 rounded-xl hover:bg-gray-100 transition"
                >
                  <span className="text-indigo-600">{item.icon}</span>
                  <span className="font-medium text-sm">{item.label}</span>
                </motion.button>
              ))}
            </div>

            {/* ⚙️ SETTINGS + ACTIONS */}
            <div className="mt-auto p-4 border-t flex flex-col gap-2">
              {/* Theme */}
              <motion.button
                whileTap={{ scale: 0.96 }}
                onClick={toggleTheme}
                className="flex items-center gap-3 p-3 rounded-xl hover:bg-gray-100"
              >
                {darkMode ? <Sun size={18} /> : <Moon size={18} />}
                <span className="text-sm font-medium">Toggle Theme</span>
              </motion.button>

              {isloggedIn ? (
                <>
                  <motion.button
                    whileTap={{ scale: 0.96 }}
                    onClick={() => {
                      navigate("/app/profile");
                      close();
                    }}
                    className="flex items-center gap-3 p-3 rounded-xl hover:bg-gray-100"
                  >
                    <User size={18} />
                    <span className="text-sm font-medium">Profile</span>
                  </motion.button>

                  <motion.button
                    whileTap={{ scale: 0.96 }}
                    onClick={() => {
                      navigate("/app/chat");
                      close();
                    }}
                    className="flex items-center gap-3 p-3 rounded-xl hover:bg-gray-100"
                  >
                    <Inbox size={18} />
                    <span className="text-sm font-medium">Messages</span>
                  </motion.button>

                  <motion.button
                    whileTap={{ scale: 0.96 }}
                    onClick={handleLogout}
                    className="flex items-center gap-3 p-3 rounded-xl hover:bg-red-50 text-red-500"
                  >
                    <LogOut size={18} />
                    <span className="text-sm font-medium">Logout</span>
                  </motion.button>
                </>
              ) : (
                <motion.button
                  whileTap={{ scale: 0.96 }}
                  onClick={handleStart}
                  className="bg-indigo-600 text-white py-3 rounded-xl text-sm font-semibold"
                >
                  Get Started
                </motion.button>
              )}
            </div>
          </motion.div>
        </Drawer>
      )}
    </header>
  );
}
