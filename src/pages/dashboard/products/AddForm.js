import React, { useState } from "react";
import Typography from "@mui/material/Typography";
import { IconButton, Grid, Box, Button } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import TextField from "@mui/material/TextField";

const token = localStorage.getItem("token");

export default function AddForm({ closeEvent, setModalOpen }) {
  const [name, setName] = useState("");
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleUserNameChange = (event) => {
    setUserName(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const sendingAddUserRequest = async () => {
    var myHeaders = new Headers();

    myHeaders.append("Content-Type", "application/json");

    myHeaders.append("Authorization", token);

    const response = await fetch(process.env.REACT_APP_URL + "/api/v1/admin/user", {
      method: "POST",
      headers: myHeaders,
      body: JSON.stringify({
        name: name,
        user_name: userName,
        password: password,
      }),
    });

    const res = await response.json();
    // if(res.status==='401'){

    // }
    console.log(res);
  };

  const buttonClickHandler = () => {
    if (name && userName && password) {
      sendingAddUserRequest();
      setModalOpen(false);
    }
  };

  return (
    <>
      <Box />
      <Typography variant="h5" align="center">
        Add User
      </Typography>
      <IconButton
        style={{ position: "absolute", top: "0", right: "0" }}
        onClick={closeEvent}
      >
        <CloseIcon />
      </IconButton>
      <Box height={20} />
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TextField
            id="outlined-basic"
            label="Name"
            variant="outlined"
            size="small"
            type="text"
            value={name}
            onChange={handleNameChange}
            sx={{ minWidth: 100 + "%" }}
          ></TextField>
        </Grid>
        <Grid item xs={12}>
          <TextField
            id="outlined-basic"
            label="User Name"
            variant="outlined"
            size="small"
            value={userName}
            onChange={handleUserNameChange}
            sx={{ minWidth: 100 + "%" }}
          ></TextField>
        </Grid>
        <Grid item xs={12}>
          <TextField
            id="outlined-basic"
            label="Password"
            variant="outlined"
            size="small"
            value={password}
            onChange={handlePasswordChange}
            sx={{ minWidth: 100 + "%" }}
          ></TextField>
        </Grid>

        <Grid item xs={12}>
          <Typography variant="h5" align="center">
            <Button onClick={buttonClickHandler} variant="contained">
              Submit
            </Button>
          </Typography>
        </Grid>
      </Grid>
      <Box sx={{ m: 4 }} />
    </>
  );
}
