import { useAtom } from "jotai";
import { motion } from "framer-motion";
import { Zap, Menu, Sun, Moon, LogOut, User, Inbox } from "lucide-react";
import { useEffect } from "react";
import { useNavigate } from "react-router";
import { useMediaQuery, useDisclosure } from "@mantine/hooks";
import { loginAtom, userInfoAtom } from "../../store/atom.js";
import { Avatar, Drawer, NavLink, Popover, useMantineColorScheme } from "@mantine/core";
import { toast } from "react-toastify";
import { fetchUserInfo } from "../../utils/commonfunction.js";

export function Header() {
  // ✅ Dark mode is managed by Mantine (persists to localStorage and sets
  //    data-mantine-color-scheme on <html>, which Tailwind's dark: reacts to)
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();
  const isDark = colorScheme === "dark";
  const toggleTheme = toggleColorScheme;

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
            <div className="w-8 h-8 bg-brand-gradient rounded-lg flex items-center justify-center shadow-soft">
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
              <NavLink label="Matches"  href="/app/matches" />
              <NavLink label="Community"  href="/app/community" />
              <NavLink label="About" href="/app/about" />
            </div>
          )}

          {/* ✅ Desktop Right */}
          <div className="hidden md:flex items-center gap-3">
            {/* Theme */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-md hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
            >
              {isDark ? <Sun size={18} /> : <Moon size={18} />}
            </button>

            {isloggedIn ? (
              <Popover width={200} position="bottom" withArrow shadow="md">
                <Popover.Target>
                  <Avatar src={user?.profilePic || null} />
                </Popover.Target>

                <Popover.Dropdown>
                  <button
                    onClick={() => navigate("/app/profile")}
                    className="flex gap-2 w-full p-2 hover:bg-neutral-100 dark:hover:bg-neutral-800 rounded"
                  >
                    <User size={16} /> Profile
                  </button>

                  <button
                    onClick={() => navigate("/app/chat")}
                    className="flex gap-2 w-full p-2 hover:bg-neutral-100 dark:hover:bg-neutral-800 rounded"
                  >
                    <Inbox size={16} /> Messages
                  </button>

                  <button
                    onClick={handleLogout}
                    className="flex gap-2 w-full p-2 text-danger-600 hover:bg-danger-50 dark:hover:bg-danger-950/40 rounded"
                  >
                    <LogOut size={16} /> Logout
                  </button>
                </Popover.Dropdown>
              </Popover>
            ) : (
              <button
                onClick={handleStart}
                className="px-4 py-2 bg-primary-600 text-white rounded-lg font-medium hover:bg-primary-700 transition-colors shadow-soft"
              >
                Get Started
              </button>
            )}
          </div>

          {isMobile && (
            <div className="flex items-center">
              <button onClick={toggleTheme} className="mr-3">
                {isDark ? <Sun size={18} /> : <Moon size={18} />}
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
            className="flex flex-col h-full bg-white dark:bg-neutral-900"
          >
            {/* 👤 USER HEADER */}
            {isloggedIn && (
              <div className="flex items-center gap-3 p-5 border-b dark:border-neutral-800">
                <Avatar src={user?.profilePic || null} size="lg" />
                <div>
                  <p className="font-semibold text-sm">
                    {user?.name || "User"}
                  </p>
                  <p className="text-xs text-neutral-500 dark:text-neutral-400">Welcome back 👋</p>
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
                  className="flex items-center gap-3 p-3 rounded-xl hover:bg-neutral-100 transition"
                >
                  <span className="text-primary-600">{item.icon}</span>
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
                className="flex items-center gap-3 p-3 rounded-xl hover:bg-neutral-100 dark:hover:bg-neutral-800 transition"
              >
                {isDark ? <Sun size={18} /> : <Moon size={18} />}
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
                    className="flex items-center gap-3 p-3 rounded-xl hover:bg-neutral-100 dark:hover:bg-neutral-800 transition"
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
                    className="flex items-center gap-3 p-3 rounded-xl hover:bg-neutral-100 dark:hover:bg-neutral-800 transition"
                  >
                    <Inbox size={18} />
                    <span className="text-sm font-medium">Messages</span>
                  </motion.button>

                  <motion.button
                    whileTap={{ scale: 0.96 }}
                    onClick={handleLogout}
                    className="flex items-center gap-3 p-3 rounded-xl hover:bg-danger-50 dark:hover:bg-danger-950/40 text-danger-600 transition"
                  >
                    <LogOut size={18} />
                    <span className="text-sm font-medium">Logout</span>
                  </motion.button>
                </>
              ) : (
                <motion.button
                  whileTap={{ scale: 0.96 }}
                  onClick={handleStart}
                  className="bg-primary-600 text-white py-3 rounded-xl text-sm font-semibold"
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
