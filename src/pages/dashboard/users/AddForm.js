import React, { useState } from "react";
import Typography from "@mui/material/Typography";
import { IconButton, Grid, Box, Button } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import TextField from "@mui/material/TextField";
import useAxios from "../../../hooks/use-axios";
import Swal from "sweetalert2";

export default function AddForm({ closeEvent, setModalOpen, callGetUsers }) {
  const [name, setName] = useState("");
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const Axios = useAxios();

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
    await Axios({
      method: "POST",
      url: "/api/v1/admin/user",
      data: { name: name, user_name: userName, password: password },
    })
      .then((res) => {
        console.log(res);
        Swal.fire({
          position: "center",
          icon: "success",
          title: "User Added Successfully",
          showConfirmButton: false,
          timer: 2000,
        });
        callGetUsers();
      })
      .catch((err) => {
        console.log(err);
        Swal.fire({
          icon: "error",
          title: "Try Again",
          text: "Something went wrong!",
        });
        callGetUsers();
      });
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
