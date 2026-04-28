import { Outlet, Navigate } from "react-router";
import { useEffect, useState } from "react";
import { connectSocket } from "../../utils/socket.ts";
import { Header } from "./Header.tsx";

export function ProtectedLayout() {
  const isloggedIn = true;

  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("userInfo") || "null");
    setUser(storedUser);
  }, []);

  useEffect(() => {
    if (user?._id) {
      connectSocket(user._id);
    }
  }, [user?._id]);

  if (!isloggedIn) {
    return <Navigate to="/auth/login" />;
  }

  return (
    <div>
      <Header />
      <Outlet />
    </div>
  );
}
