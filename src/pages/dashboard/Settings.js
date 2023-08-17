import React from "react";
import Sidenav from "../../components/Dashboard/Sidenav";
import { Box } from "@mui/material";

import Navbar from "../../components/Dashboard/Navbar";

const Settings = () => {
  return (
    <>
      <Navbar />
      <Box height={30} />
      <Box sx={{ display: "flex" }}>
        <Sidenav></Sidenav>
        <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
          <h1>Settings</h1>
        </Box>
      </Box>
    </>
  );
};

export default Settings;
