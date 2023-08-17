import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import LoginPage from "./components/Login Page/LoginPage";
import RootLayout from "./pages/Root";
import OTPSent from "../src//components/Email Verification/OTP Sent/OTPSent";
import PasswordRejected from "./components/Email Verification/Password Rejected/PasswordRejected";
import PasswordChanged from "./components/Email Verification/Password Changed/PasswordChanged";
import Home from "./pages/dashboard/Home";
import About from "./pages/dashboard/About";
import Settings from "./pages/dashboard/Settings";
import Users from "./pages/dashboard/Users";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <RootLayout />,
      children: [
        {
          path: "login",
          element: <LoginPage />,
        },
        {
          path: "createPassword",
          element: <OTPSent />,
        },
        {
          path: "passwordChanged",
          element: <PasswordChanged />,
        },
        {
          path: "passwordRejected",
          element: <PasswordRejected />,
        },
        {
          path: "home",
          element: <Home />,
        },
        {
          path: "about",
          element: <About />,
        },
        {
          path: "settings",
          element: <Settings />,
        },
        {
          path: "Users",
          element: <Users />,
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
