import { useEffect, useState } from "react";
import {
  ActionIcon,
  Tooltip,
  useComputedColorScheme,
  useMantineColorScheme,
} from "@mantine/core";
import { Link, NavLink, useLocation, useNavigate } from "react-router";
import {
  BookOpen,
  Bookmark,
  ChevronDown,
  Compass,
  GraduationCap,
  HelpCircle,
  LayoutDashboard,
  LogOut,
  Menu,
  MessageCircle,
  Moon,
  Plus,
  Sparkles,
  Sun,
  UserRound,
  Users,
  X,
  Zap,
} from "lucide-react";
import { useAtom } from "jotai";
import { loginAtom, userInfoAtom } from "../../store/atom";
import { fetchUserInfo } from "../../utils/commonfunction.js";

export function Header() {
  const colorScheme = useComputedColorScheme("light");
  const { setColorScheme } = useMantineColorScheme();
  const themeLabel =
    colorScheme === "dark" ? "Switch to light mode" : "Switch to dark mode";
  const [mobileOpen, setMobileOpen] = useState(false);
  const [accountOpen, setAccountOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useAtom(loginAtom);
  const [user, setUser] = useAtom(userInfoAtom);
  const location = useLocation();
  const navigate = useNavigate();
  const savedView =
    new URLSearchParams(location.search).get("view") === "saved";
  useEffect(() => {
    setMobileOpen(false);
    setAccountOpen(false);
  }, [location.pathname, location.search]);
  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (!token) return;
    setIsLoggedIn(true);
    try {
      const payload = JSON.parse(atob(token.split(".")[1]));
      fetchUserInfo(payload.id)
        .then((profile) => setUser(profile || null))
        .catch(() => setUser(null));
    } catch {
      setIsLoggedIn(false);
    }
  }, [setIsLoggedIn, setUser]);
  const logout = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/user/logout`,
        { method: "POST", credentials: "include" },
      );
      if (!response.ok) return;
      localStorage.removeItem("accessToken");
      localStorage.removeItem("userInfo");
      setIsLoggedIn(false);
      setUser(null);
      navigate("/");
    } catch {
      navigate("/auth/login");
    }
  };
  return (
    <>
      {mobileOpen && (
        <button
          className="sidebar-backdrop"
          aria-label="Close navigation"
          onClick={() => setMobileOpen(false)}
        />
      )}
      <aside
        className={`workspace-sidebar ${mobileOpen ? "sidebar-open" : ""}`}
      >
        <Link className="workspace-brand" to="/">
          <span className="brand-symbol">
            <Zap size={21} fill="currentColor" />
          </span>
          skill<span className="brand-x">x</span>
          <span className="brand-period">.</span>
        </Link>
        <button
          className="mobile-close"
          aria-label="Close navigation"
          onClick={() => setMobileOpen(false)}
        >
          <X size={20} />
        </button>
        <div className="workspace-label">YOUR LEARNING SPACE</div>
        <nav className="workspace-nav" aria-label="Main navigation">
          <NavLink to="/app/overview">
            <LayoutDashboard size={19} /> Overview
          </NavLink>
          <Link
            className={
              (location.pathname === "/" && !savedView) ||
              location.pathname.includes("explore-skills") ||
              location.pathname.includes("/skills/")
                ? "active"
                : ""
            }
            to="/"
          >
            <Compass size={19} /> Explore skills{" "}
            <span className="nav-new">NEW</span>
          </Link>
          <NavLink to="/app/matches">
            <Sparkles size={19} /> My matches
          </NavLink>
          <NavLink to="/app/chat">
            <MessageCircle size={19} /> Messages
          </NavLink>
          <Link className={savedView ? "active" : ""} to="/?view=saved">
            <Bookmark size={19} /> Saved skills
          </Link>
        </nav>
        <div className="workspace-label community-label">GROW TOGETHER</div>
        <nav className="workspace-nav" aria-label="Community navigation">
          <NavLink to="/app/community">
            <Users size={19} /> Community
          </NavLink>
          <NavLink to="/app/profile">
            <BookOpen size={19} /> My skills
          </NavLink>
        </nav>
        <div className="sidebar-bottom">
          <div className="credit-summary">
            <span className="credit-icon">
              <Zap size={18} />
            </span>
            <div>
              <strong>Knowledge is currency.</strong>
              <p>Teach a little. Learn a lot.</p>
            </div>
          </div>
          <Link className="sidebar-share" to="/app/profile">
            <Plus size={16} /> Share a skill
          </Link>
          <Link className="sidebar-help" to="/app/about">
            <HelpCircle size={17} /> About SkillX <ArrowIcon />
          </Link>
          <div className="sidebar-user">
            <span className="user-initial">{user?.name?.charAt(0) || "S"}</span>
            <div>
              <strong>{user?.name || "Hello, curious mind"}</strong>
              <p>
                {isLoggedIn ? "Keep growing" : "Your next chapter starts here"}
              </p>
            </div>
            <GraduationCap size={20} />
          </div>
        </div>
      </aside>
      <header className="workspace-topbar">
        <div className="topbar-left">
          <button
            className="mobile-menu"
            aria-label="Open navigation"
            onClick={() => setMobileOpen(true)}
          >
            <Menu size={22} />
          </button>
          <span className="breadcrumb">
            Your workspace <span>/</span>{" "}
            <strong>
              {savedView
                ? "Saved skills"
                : location.pathname === "/"
                  ? "Explore skills"
                  : location.pathname.includes("chat")
                    ? "Messages"
                    : location.pathname.includes("matches")
                      ? "My matches"
                      : location.pathname.includes("profile")
                        ? "My profile"
                        : location.pathname.includes("community")
                          ? "Community"
                          : "Explore"}
            </strong>
          </span>
        </div>
        <div className="topbar-right">
          <span className="topbar-note">
            <span className="status-dot" /> Stay curious. Keep growing.
          </span>
          <Tooltip label={themeLabel}>
            <ActionIcon
              variant="subtle"
              color="primary"
              size={40}
              radius="md"
              aria-label={themeLabel}
              onClick={() =>
                setColorScheme(colorScheme === "dark" ? "light" : "dark")
              }
            >
              {colorScheme === "dark" ? <Sun size={20} /> : <Moon size={20} />}
            </ActionIcon>
          </Tooltip>
          {!isLoggedIn ? (
            <Link className="header-signin" to="/auth/login">
              Log in <Zap size={14} />
            </Link>
          ) : (
            <div className="account-control">
              <button
                className="account-button"
                onClick={() => setAccountOpen(!accountOpen)}
                aria-label="Account menu"
                aria-expanded={accountOpen}
              >
                <span className="user-initial">
                  {user?.name?.charAt(0) || "S"}
                </span>
                <ChevronDown size={14} />
              </button>
              {accountOpen && (
                <div className="account-menu">
                  <Link to="/app/profile">
                    <UserRound size={15} /> My profile
                  </Link>
                  <button onClick={logout}>
                    <LogOut size={15} /> Log out
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </header>
    </>
  );
}

function ArrowIcon() {
  return (
    <ChevronDown
      size={14}
      style={{ marginLeft: "auto", transform: "rotate(-135deg)" }}
    />
  );
}
