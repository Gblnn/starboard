import { createBrowserRouter, Navigate } from "react-router-dom";
import { Login } from "./pages/Login";
import { Dashboard } from "./pages/Dashboard";
import { Documents } from "./pages/Documents";
import { Settings } from "./pages/Settings";
import { Inbox } from "./pages/Inbox";
import { Records } from "./pages/Records";
import { AppLayout } from "./components/layout/AppLayout";
import { ProtectedRoute } from "./components/ProtectedRoute";

export const router = createBrowserRouter(
  [
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "/dashboard",
      element: (
        <ProtectedRoute>
          <AppLayout>
            <Dashboard />
          </AppLayout>
        </ProtectedRoute>
      ),
    },
    {
      path: "/documents",
      element: (
        <ProtectedRoute>
          <AppLayout>
            <Documents />
          </AppLayout>
        </ProtectedRoute>
      ),
    },
    {
      path: "/settings",
      element: (
        <ProtectedRoute>
          <AppLayout>
            <Settings />
          </AppLayout>
        </ProtectedRoute>
      ),
    },
    {
      path: "/inbox",
      element: (
        <ProtectedRoute>
          <Inbox />
        </ProtectedRoute>
      ),
    },
    {
      path: "/records",
      element: (
        <ProtectedRoute>
          <AppLayout>
            <Records />
          </AppLayout>
        </ProtectedRoute>
      ),
    },
    {
      path: "/",
      element: <Navigate to="/dashboard" replace />,
    },
  ]
  // {
  //   future: {
  //     v7_startTransition: true,
  //   }
  // }
);
