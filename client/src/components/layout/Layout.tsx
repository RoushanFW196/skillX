import { Header } from "./Header.tsx";
import { Outlet } from "react-router";

export function Layout() {
  return (
    <div className="workspace-shell">
      <Header />
      <main className="workspace-main">
        <Outlet />
      </main>
    </div>
  );
}
