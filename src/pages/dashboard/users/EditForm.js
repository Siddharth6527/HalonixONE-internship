import React, { useState } from "react";
import Typography from "@mui/material/Typography";
import { IconButton, Grid, Box, Button } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import TextField from "@mui/material/TextField";
import useAxios from "../../../hooks/use-axios";
import { Card } from "@mui/material";
import Swal from "sweetalert2";

export default function EditForm({ closeEvent, id, callGetUsers }) {
  const Axios = useAxios();
  const [userName, setUserName] = useState("");

  const handleNameChange = (event) => {
    setUserName(event.target.value);
  };

  const handleClose = () => {
    closeEvent(false);
  };

  const sendingEditUserRequest = async (id) => {
    const userData = { user_id: id, name: userName };
    console.log(id);

    await Axios({
      method: "PUT",
      url: "/api/v1/admin/user",
      data: userData,
    })
      .then((res) => {
        console.log(res);
        closeEvent(false);
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Name Changed",
          showConfirmButton: false,
          timer: 2000,
        });
        callGetUsers();
      })
      .catch((err) => {
        console.log(err);
        closeEvent(false);
        Swal.fire({
          icon: "error",
          title: "Try Again",
          text: "Something went wrong!",
          footer: '<a href="">Why do I have this issue?</a>',
        });
        callGetUsers();
      });
  };

  const buttonClickHandler = () => {
    sendingEditUserRequest(id);
  };

  return (
    <>
      <Card sx={{ mb: 5, padding: 3, boxShadow: "none", borderRadius: 5 }}>
        <Box>
          <Box />
          <Typography variant="h5" align="center">
            Edit User
          </Typography>
          <IconButton
            style={{ position: "fixed", top: 10 + "%", right: 2 + "%" }}
            onClick={handleClose}
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
                value={userName}
                onChange={handleNameChange}
                sx={{ minWidth: 100 + "%" }}
              ></TextField>
            </Grid>{" "}
            <Grid item xs={12}>
              <Typography variant="h5" align="center">
                <Button
                  onClick={buttonClickHandler}
                  sx={{ mt: 5 + "%" }}
                  variant="contained"
                >
                  Submit
                </Button>
              </Typography>
            </Grid>
          </Grid>
        </Box>
      </Card>
    </>
  );
}
