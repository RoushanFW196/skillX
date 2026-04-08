import { Outlet, Navigate } from "react-router";

export function ProtectedLayout() {
  const isLoggedIn = false; // 🔁 replace with real auth

  if (!isLoggedIn) {
    return <Navigate to="/auth/login" />;
  }

  return (
    <div>
      <h1>App Layout</h1>
      <Outlet />
    </div>
  );
}