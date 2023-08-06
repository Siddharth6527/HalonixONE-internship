import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import useInput from "../../hooks/use-input";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import EmailModal from "./EmailModal";
import MuiAlert from "@mui/material/Alert";
import Snackbar from "@mui/material/Snackbar";

const lengthCheck = (val) => {
  return val.trim().length >= 6;
};

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" href="https://www.halonix.co.in/">
        Halonix Technologies Pvt Limited
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const defaultTheme = createTheme();

export default function NewLoginPage() {
  let url = "https://halonix-one.onrender.com/";
  const [errorMessage, setErrorMessage] = useState({
    status: "",
    message: "",
  });
  // let loginData;
  let res = undefined;
  const [isSnackbarOpen, setIsSnackbarOpen] = useState(false);
  const navigate = useNavigate();
  let isFormValid = false;
  const [isModalOpen, setIsModalOpen] = useState(false);

  const {
    value: enteredEmail,
    isValid: enteredEmailIsValid,
    valueChangeHandler: enteredEmailChangeHandler,
    inputBlurHandler: enteredEmailBlurHandler,
  } = useInput(lengthCheck);

  const {
    value: enteredPassword,
    isValid: enteredPasswordIsValid,
    valueChangeHandler: enteredPasswordChangeHandler,
    inputBlurHandler: enteredPasswordBlurHandler,
  } = useInput(lengthCheck);

  const SendingLoginRequest = async (props) => {
    const response = await fetch(url + "v1/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(props),
    });

    res = await response.json();
    isFormValid = false;
    const { accesstoken, description } = res;

    if (res.status === "failure") {
      console.log(res.description);
      setErrorMessage({ status: "error", message: res.description });
      setIsSnackbarOpen(true);
    }
    if (res.status === "success") {
      // setAlert(true);
      setIsSnackbarOpen(true);
      setErrorMessage({
        status: res.status,
        message: res.description,
      });
      setTimeout(() => {
        navigate("/home");
      }, 2000);
      localStorage.setItem("token", accesstoken);
    }
    console.log(res);
    console.log(description);
  };

  if (enteredEmailIsValid && enteredPasswordIsValid) {
    isFormValid = true;
  }

  const forgotPasswordClickHandler = () => {
    setIsModalOpen(true);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    SendingLoginRequest({ user_name: enteredEmail, password: enteredPassword });
  };

  const handleClose = () => {
    setIsSnackbarOpen(false);
  };

  return (
    <>
      {isModalOpen && (
        <EmailModal modalOpen={isModalOpen} setModalOpen={setIsModalOpen} />
      )}
      <ThemeProvider theme={defaultTheme}>
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <Box
            sx={{
              marginTop: 8,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign in
            </Typography>
            <Box
              component="form"
              onSubmit={handleSubmit}
              noValidate
              sx={{ mt: 1 }}
            >
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
                type="email"
                value={enteredEmail}
                onBlur={enteredEmailBlurHandler}
                onChange={enteredEmailChangeHandler}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                value={enteredPassword}
                onChange={enteredPasswordChangeHandler}
                onBlur={enteredPasswordBlurHandler}
              />
              <Button
                disabled={!isFormValid}
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Sign In
              </Button>
              <Grid container>
                <Grid item xs>
                  <Link
                    sx={{ cursor: "pointer" }}
                    onClick={forgotPasswordClickHandler}
                    variant="body2"
                  >
                    Forgot password?
                  </Link>
                </Grid>
              </Grid>
            </Box>
          </Box>
          <Copyright sx={{ mt: 8, mb: 4 }} />
        </Container>
      </ThemeProvider>
      {isSnackbarOpen && (
        <Snackbar
          open={isSnackbarOpen}
          autoHideDuration={6000}
          onClose={handleClose}
          anchorOrigin={{ vertical: "top", horizontal: "right" }}
        >
          <Alert
            onClose={handleClose}
            severity={errorMessage.status}
            sx={{ width: "100%" }}
          >
            {errorMessage.message}
          </Alert>
        </Snackbar>
      )}
    </>
  );
}
