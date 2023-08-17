import React from "react";
import Sidenav from "../../components/Dashboard/Sidenav";
import { Box } from "@mui/material";
import Navbar from "../../components/Dashboard/Navbar";
import UserList from "./users/UserList";

const Users = () => {
  return (
    <>
      <div className="bgcolor">
        <Navbar />
        <Box height={70} />
        <Box sx={{ display: "flex" }}>
          <Sidenav></Sidenav>
          <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
            <UserList />
          </Box>
        </Box>
      </div>
    </>
  );
};

export default Users;
