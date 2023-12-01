import "./App.css";
import { createBrowserRouter, Navigate, RouterProvider } from "react-router-dom";
import Layout from "./components/layout/layout";
import LandingPage from "./pages/landing-page";
import DashboardPage from "./pages/dashboard-page";
import Register from "./pages/register-page";
import Login from "./pages/login-page";
import { useAuth } from "./context/auth-context";
import AllTodosPage from "./pages/alltodos-page";
import ResetPasswordPage from "./pages/reset-pasw-page";
import ForgotPasswordPage from "./pages/forgot-passw-page";

function App() {
  const { isLoggedIn } = useAuth();


  const router = createBrowserRouter([
    {
      element: <Layout />,
      children: [
        {
          path: "/",
          element: <LandingPage />,
        },
        {
          path: "/register",
          element: <Register />,
        },
        {
          path: "/login",
          element: <Login />,
        },
        {
          path: "/forgot-password",
          element: <ForgotPasswordPage />,
        },
        {
          path: '/reset-password',
          element: <ResetPasswordPage />

        },
        {
          path: "/dashboard",
          element: isLoggedIn ? <DashboardPage /> : <Navigate to="/" />,
        },
        {
          path: "/:username/todos",
          element: isLoggedIn ? <AllTodosPage /> : <Navigate to="/" />,
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
