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
import HalonixLogo from "../../Assets/LoginPage/Halonix logo.jpeg";
import classes from "./LoginPage.module.css";
import InnovationText from "../../Assets/LoginPage/innovation-text.png";
import BulbImage from "../../Assets/LoginPage/pexels-pixabay-266688-removebg-preview.png";
import useAxios from "../../hooks/use-axios";
import { useEffect } from "react";

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

export default function LoginPage() {
  const [errorMessage, setErrorMessage] = useState({
    status: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);
  let isFormValid = false;
  const [isSnackbarOpen, setIsSnackbarOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();
  const Axios = useAxios();

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

  if (enteredEmailIsValid && enteredPasswordIsValid) {
    isFormValid = true;
  }

  const forgotPasswordClickHandler = () => {
    setIsModalOpen(true);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    await Axios({
      method: "POST",
      url: "/v1/auth/login",
      data: {
        user_name: enteredEmail,
        password: enteredPassword,
      },
    })
      .then((res) => {
        if (res.data.user.role === "admin") {
          setErrorMessage({
            status: "success",
            message: res.data.description,
          });
          setIsSnackbarOpen(true);
          setTimeout(() => {
            navigate("/home");
          }, 3000);
          localStorage.setItem("token", res.data.accesstoken);
        } else {
          setErrorMessage({
            status: "error",
            message: "Only admin is allowed to login",
          });
          setIsSnackbarOpen(true);
        }
      })
      .catch((err) => {
        console.log("error", err.response.data.description);
        setErrorMessage({
          status: "error",
          message: err.response.data.description,
        });
        setIsSnackbarOpen(true);
      })
      .finally(() => setLoading(false));
  };

  const handleClose = () => {
    setIsSnackbarOpen(false);
  };

  return (
    <>
      {isModalOpen && (
        <EmailModal modalOpen={isModalOpen} setModalOpen={setIsModalOpen} />
      )}
      <div className={classes["gradient-background"]}>
        <ThemeProvider theme={defaultTheme}>
          <Box height={30} />
          <img src={BulbImage} className={classes["bulb-img"]} alt="" />
          <img
            src={InnovationText}
            className={classes["innovation-text-img"]}
            alt="halonix-innovation-text"
          />

          <Container
            sx={{
              background: "#ffffff",
              padding: 10,
              pt: 7,
              borderRadius: 5,
            }}
            component="main"
            maxWidth="xs"
          >
            <Grid
              container
              spacing={2}
              display="flex"
              flexDirection="column"
              alignItems={"center"}
              sx={{ maxHeight: 10, pb: 5, borderRadius: 10 + "px" }}
            >
              <img src={HalonixLogo} alt="" />
            </Grid>
            <CssBaseline />
            <Box
              sx={{
                marginTop: 8,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <Avatar sx={{ m: 1, mb: 2, bgcolor: "secondary.main" }}>
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
                  disabled={!isFormValid || loading}
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 5, mb: 2 }}
                >
                  {loading ? "Loading.." : "Sign In"}
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
        <div>
          <Typography
            className={classes["halonix-text"]}
            variant="h1"
            color="white"
          >
            Halonix
          </Typography>
          <Typography
            className={classes["one-text"]}
            variant="h2"
            color="white"
          >
            ONE
          </Typography>
        </div>
      </div>

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
            {errorMessage.message ? errorMessage.message : "Try Again"}
          </Alert>
        </Snackbar>
      )}
    </>
  );
}
