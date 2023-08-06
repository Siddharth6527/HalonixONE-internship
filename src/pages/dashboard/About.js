import React from "react";
import Sidenav from "../../components/Dashboard/Sidenav";
import { Box, Typography } from "@mui/material";
import { DrawerHeader } from "@mui/icons-material";
import Navbar from "../../components/Dashboard/Navbar";

const About = () => {
  return (
    <>
      <Navbar />
      <Box height={30} />
      <Box sx={{ display: "flex" }}>
        <Sidenav></Sidenav>
        <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
          <h1>About</h1>
        </Box>
      </Box>
    </>
  );
};

export default About;
