import React, { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";

export default function RootLayout() {
  const navigate = useNavigate();

  useEffect(() => {
    if (
      !localStorage.getItem("token") ||
      localStorage.getItem("token") === undefined
    ) {
      console.log("Token is not available");
      navigate("/login");
    } else {
      console.log("Token is available");
      navigate("/home");
    }
  }, []);

  return (
    <>
      <Outlet />
    </>
  );
}
