import { Outlet, Navigate, useLocation } from "react-router";
import { useEffect, useState } from "react";
import { connectSocket } from "../../utils/socket.ts";
import { Header } from "./Header.tsx";
import type { UserProfile } from "../../store/atom";

export function ProtectedLayout() {
  const location = useLocation();
  const isloggedIn = Boolean(localStorage.getItem("accessToken"));

  const [user, setUser] = useState<UserProfile | null>(null);

  useEffect(() => {
    try {
      setUser(JSON.parse(localStorage.getItem("userInfo") || "null"));
    } catch {
      setUser(null);
    }
  }, []);

  useEffect(() => {
    if (user?._id) {
      connectSocket(user._id);
    }
  }, [user?._id]);

  if (!isloggedIn) {
    return (
      <Navigate
        to="/auth/login"
        replace
        state={{ from: location.pathname + location.search }}
      />
    );
  }

  return (
    <div className="workspace-shell">
      <Header />
      <main className="workspace-main">
        <Outlet />
      </main>
    </div>
  );
}
