import React from 'react'
import ReactDOM from 'react-dom/client'
import { Navigate, RouterProvider, createBrowserRouter } from "react-router-dom";
import App from './App.tsx'
import './index.css'
import { Suspense, lazy } from "react";

import NotFound from "./screens/notFound";
import Loader from './components/loader/loader.tsx';
import { AuthProvider } from './screens/Auth/AuthContext.tsx';
import { ThemeProvider } from './components/theme-provider.tsx';

const Page1 = lazy(() =>
  wait(1300).then(() => import("./screens/page1.tsx"))
);

const Page2 = lazy(() =>
  wait(1300).then(() => import("./screens/page2.tsx"))
);

const Login = lazy(() => import("./screens/Auth/login.tsx"));
const Register = lazy(() => import("./screens/Auth/Register.tsx"));

// ── Admin pages ───────────────────────────────────────────────────────────
const AdminDashboard  = lazy(() => import("./screens/Admin/Dashboard.tsx"));
const AdminUsers      = lazy(() => import("./screens/Admin/UserPage.tsx"));
const AdminDocuments  = lazy(() => import("./screens/Admin/DocumentPage.tsx"));
const AdminSettings   = lazy(() => import("./screens/Admin/Setting.tsx"));
const AdminProfile    = lazy(() => import("./screens/Admin/Profile.tsx"));

// Legacy route kept for old links
const LegacyDashboard = lazy(() => import("./screens/Dashboard.tsx"));

const router = createBrowserRouter([
  // ── Auth pages (no navbar) ────────────────────────────
  {
    path: "/react-vite-supreme/login",
    element: (
      <Suspense fallback={<Loader />}>
        <Login />
      </Suspense>
    ),
  },
  {
    path: "/react-vite-supreme/register",
    element: (
      <Suspense fallback={<Loader />}>
        <Register />
      </Suspense>
    ),
  },

  // ── Admin pages (no public navbar) ────────────────────
  {
    path: "/react-vite-supreme/admin/dashboard",
    element: <Suspense fallback={<Loader />}><AdminDashboard /></Suspense>,
  },
  {
    path: "/react-vite-supreme/admin/users",
    element: <Suspense fallback={<Loader />}><AdminUsers /></Suspense>,
  },
  {
    path: "/react-vite-supreme/admin/documents",
    element: <Suspense fallback={<Loader />}><AdminDocuments /></Suspense>,
  },
  {
    path: "/react-vite-supreme/admin/settings",
    element: <Suspense fallback={<Loader />}><AdminSettings /></Suspense>,
  },
  {
    path: "/react-vite-supreme/admin/profile",
    element: <Suspense fallback={<Loader />}><AdminProfile /></Suspense>,
  },

  // ── Legacy dashboard redirect ──────────────────────────
  {
    path: "/react-vite-supreme/dashboard",
    element: <Navigate to="/react-vite-supreme/admin/dashboard" replace />,
  },

  // ── Legacy standalone dashboard (kept as fallback) ────
  {
    path: "/react-vite-supreme/dashboard-old",
    element: <Suspense fallback={<Loader />}><LegacyDashboard /></Suspense>,
  },

  // ── Main app with navbar ──────────────────────────────
  {
    path: "/react-vite-supreme/",
    element: <App />,
    children: [
      {
        path: "/react-vite-supreme/",
        element: <Navigate to="/react-vite-supreme/admin/dashboard" />,
      },
      {
        path: "/react-vite-supreme/page1",
        element: (
          <Suspense fallback={<Loader />}>
            <Page1 />
          </Suspense>
        ),
      },
      {
        path: "/react-vite-supreme/page2",
        element: (
          <Suspense fallback={<Loader />}>
            <Page2 />
          </Suspense>
        ),
      },
      {
        path: "*",
        element: <NotFound />,
      },
    ],
  },
]);

function wait(time: number) {
  return new Promise((resolve) => {
    setTimeout(resolve, time);
  });
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <AuthProvider>
        <RouterProvider router={router} />
      </AuthProvider>
    </ThemeProvider>
  </React.StrictMode>,
)
