import { Outlet } from "react-router";
import { Header } from "./Header";

export function AuthLayout() {
  return (
    <div className="h-screen flex flex-col gap-4">
      <Header />
      <Outlet />
    </div>
  );
}
