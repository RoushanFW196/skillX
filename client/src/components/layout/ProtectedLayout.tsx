import { Outlet, Navigate } from "react-router";
import { Header } from "./Header";

export function ProtectedLayout() {
  const isLoggedIn = true; // 🔁 replace with real auth

  if (!isLoggedIn) {
    return <Navigate to="/auth/login" />;
  }

  return (
    <div>
      <Header />
      <Outlet />
    </div>
  );
}