import { Zap, Menu, X, Sun, Moon, LogOut, User } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router";

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  const navigate = useNavigate();

  // 🔥 TEMP: replace with real auth state
  const user = {
    name: "Roushan",
    avatar: "https://i.pravatar.cc/40",
  };

  const handleStart = () => {
    navigate("/auth/signup");
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
      navigate("/");
      localStorage.removeItem("accessToken");
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
              SkillSwap
            </span>
          </div>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            {["Browse Skills", "Community", "About"].map((item) => (
              <a
                key={item}
                href="#"
                className="text-sm font-medium text-neutral-700 hover:text-indigo-600 transition"
              >
                {item}
              </a>
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
            {user ? (
              <div className="relative">
                <img
                  src={user.avatar}
                  alt="profile"
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                  className="w-9 h-9 rounded-full cursor-pointer border"
                />

                {dropdownOpen && (
                  <div className="absolute right-0 mt-3 w-48 bg-white  border  rounded-xl shadow-lg p-2">
                    <div className="px-3 py-2 text-sm text-neutral-600 dark:text-neutral-300">
                      {user.name}
                    </div>

                    <button
                      onClick={() => navigate("/profile")}
                      className="flex items-center gap-2 w-full px-3 py-2 text-sm hover:bg-neutral-100  rounded-lg"
                    >
                      <User className="w-4 h-4" />
                      Profile
                    </button>

                    <button
                      onClick={handleLogout}
                      className="flex items-center gap-2 w-full px-3 py-2 text-sm text-red-500 hover:bg-red-50  rounded-lg"
                    >
                      <LogOut className="w-4 h-4" />
                      Logout
                    </button>
                  </div>
                )}
              </div>
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
