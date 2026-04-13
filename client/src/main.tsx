import { lazy, StrictMode, Suspense } from "react";
import { createRoot } from "react-dom/client";
import "@mantine/core/styles.css";

import { MantineProvider } from "@mantine/core";
import App from "./App.tsx";
import "./index.css";
import { createBrowserRouter } from "react-router";
import { RouterProvider } from "react-router/dom";
import ErrorPage from "./errorboundary/Errorpage.js";
import { AuthLayout } from "./components/layout/AuthLayout.tsx";
import { ProtectedLayout } from "./components/layout/ProtectedLayout.tsx";
const Loadable = (Component: any) => (
  <Suspense fallback={<div>Loading...</div>}>
    <Component />
  </Suspense>
);

const Home = Loadable(lazy(() => import("./pages/Home")));
const Signup = Loadable(lazy(() => import("./pages/Signup")));
const Login = Loadable(lazy(() => import("./pages/Login")));
const Profile = Loadable(lazy(() => import("./pages/Profile")));
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [{ index: true, element: Home }],
  },
  {
    path: "/auth",
    element: <AuthLayout />,
    children: [
      { path: "login", element: Login },
      { path: "signup", element: Signup },
    ],
  },
  {
    path: "/app",
    element: <ProtectedLayout />, // 🔒 protected
    errorElement: <ErrorPage />,
    children: [
      // { path: "dashboard", element: <Dashboard /> },
      { path: "profile", element: Profile, errorElement: <ErrorPage /> },
      { path: "test", element: <div>App Not Found</div> },
    ],
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <MantineProvider>
      <RouterProvider router={router} />
    </MantineProvider>
  </StrictMode>,
);
