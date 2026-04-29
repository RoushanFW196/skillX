import { useAtom } from "jotai";
import { Zap, Menu, X, Sun, Moon, LogOut, User, Inbox } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { loginAtom, userInfoAtom } from "../../store/atom.js";
import { Avatar, NavLink, Popover } from "@mantine/core";
import { toast } from "react-toastify";
import { fetchUserInfo } from "../../utils/commonfunction.js";

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [isloggedIn, setIsLoggedIn] = useAtom(loginAtom);
  const navigate = useNavigate();
  const [user, setUser] = useAtom(userInfoAtom);

  const handleStart = () => {
    navigate("/auth/login");
  };

  // after page reload, check if user is still logged in (e.g., by checking localStorage or making an API call)
  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      setIsLoggedIn(true);
      // Optionally, fetch user info here and set it in the global state
      fetchUser();
    }
  }, [setIsLoggedIn]);

  const fetchUser = async () => {
    const token = localStorage.getItem("accessToken");
    try {
      const decodedUser = JSON.parse(atob(token?.split(".")[1] || ""));
      const data = await fetchUserInfo(decodedUser?.id);

      setUser(data);
    } catch (error) {
      console.error("Error fetching user info:", error);
    }
  };

  const handleLogout = async () => {
    // clear tokens, cookies etc
    const response = await fetch(
      `${import.meta.env.VITE_API_BASE_URL}/user/logout`,
      {
        method: "POST",
        credentials: "include",
      },
    );
    if (response.ok) {
      localStorage.removeItem("accessToken");
      setIsLoggedIn(false);
      toast.success("Logged out successfully!");
      setTimeout(() => {
        navigate("/");
      }, 2000);
    } else {
      console.error("Logout failed");
    }
  };

  const toggleTheme = () => {
    setDarkMode(!darkMode);
    document.documentElement.classList.toggle("dark");
  };

  return (
    <header className="sticky top-0 z-50 backdrop-blur-md bg-white/80 border-b border-neutral-200">
      <nav className="max-w-10xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div
            onClick={() => navigate("/")}
            className="flex items-center gap-3 cursor-pointer group"
          >
            <div className="w-9 h-9 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-xl flex items-center justify-center shadow-md group-hover:scale-105 transition">
              <Zap className="w-5 h-5 text-white" />
            </div>

            <span className="text-xl font-bold tracking-tight text-neutral-900">
              SkillX
            </span>
          </div>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            {["Browse Skills", "Matches", "Community", "About"].map((item) => (
              <NavLink
                key={item}
                className="text-sm font-medium text-neutral-700 hover:text-indigo-600 transition"
                href={item === "Browse Skills" ? "/app/explore-skills" : "#"}
                label={item}
              />
            ))}
          </div>

          {/* Right Section */}
          <div className="hidden md:flex items-center gap-4">
            {/* 🌙 Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-800 transition"
            >
              {darkMode ? (
                <Sun className="w-5 h-5 text-yellow-400" />
              ) : (
                <Moon className="w-5 h-5" />
              )}
            </button>

            {/* 👤 If user logged in */}
            {isloggedIn ? (
              <Popover width={200} position="bottom" withArrow shadow="md">
                <Popover.Target>
                  <Avatar src={user?.profilePic || null} alt="it's me" />
                </Popover.Target>
                <Popover.Dropdown>
                  <button
                    onClick={() => navigate("/app/profile")}
                    className="flex items-center gap-2 w-full px-3 py-2 text-sm hover:bg-neutral-100  rounded-lg"
                  >
                    <User className="w-4 h-4" />
                    Profile
                  </button>

                  <button
                    onClick={() => navigate("/app/chat")}
                    className="flex items-center gap-2 w-full px-3 py-2 text-sm hover:bg-neutral-100  rounded-lg"
                  >
                    <Inbox className="w-4 h-4" />
                    Messages
                  </button>

                  <button
                    onClick={handleLogout}
                    className="flex items-center gap-2 w-full px-3 py-2 text-sm text-red-500 hover:bg-red-50  rounded-lg"
                  >
                    <LogOut className="w-4 h-4" />
                    Logout
                  </button>
                </Popover.Dropdown>
              </Popover>
            ) : (
              <button
                onClick={handleStart}
                className="px-5 py-2 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 text-white text-sm font-semibold shadow-md hover:shadow-lg hover:scale-[1.02] transition-all"
              >
                Get Started
              </button>
            )}
          </div>

          {/* Mobile Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-neutral-100  transition"
          >
            {mobileMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>
      </nav>

      {/* 📱 Mobile Drawer */}
      <div
        className={`md:hidden fixed top-0 right-0 h-full w-64 bg-white  shadow-xl transform transition-transform duration-300 ${
          mobileMenuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex justify-between items-center p-4 border-b ">
          <span className="font-semibold">Menu</span>
          <X
            className="w-5 h-5 cursor-pointer"
            onClick={() => setMobileMenuOpen(false)}
          />
        </div>

        <div className="flex flex-col gap-5 p-5">
          {["Browse Skills", "Community", "About"].map((item) => (
            <a key={item} href="#" className="font-medium">
              {item}
            </a>
          ))}

          {/* Theme toggle mobile */}
          <button onClick={toggleTheme} className="flex items-center gap-2">
            {darkMode ? <Sun size={18} /> : <Moon size={18} />}
            Toggle Theme
          </button>

          {user ? (
            <>
              <button onClick={() => navigate("/profile")}>Profile</button>
              <button onClick={handleLogout} className="text-red-500">
                Logout
              </button>
            </>
          ) : (
            <button
              onClick={handleStart}
              className="mt-4 px-4 py-2 rounded-lg bg-indigo-600 text-white"
            >
              Get Started
            </button>
          )}
        </div>
      </div>
    </header>
  );
}
