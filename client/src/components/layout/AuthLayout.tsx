import { Outlet } from "react-router";
import { Header } from "./Header.tsx";

export function AuthLayout() {
  return (
    <div className="workspace-shell">
      <Header />
      <main className="workspace-main auth-workspace">
        <Outlet />
      </main>
    </div>
  );
}
