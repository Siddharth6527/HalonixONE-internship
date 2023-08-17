import React, { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";

export default function RootLayout() {
  const navigate = useNavigate();

  useEffect(() => {
    if (
      !localStorage.getItem("token") ||
      localStorage.getItem("token") === undefined
    ) {
      navigate("/login");
    } else {
      navigate("/home");
    }
  }, []);

  return (
    <>
      <Outlet />
    </>
  );
}
