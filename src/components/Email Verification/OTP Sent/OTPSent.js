import React from "react";
import { useNavigate } from "react-router-dom";
import VerifyEmailSVG from "../../../Assets/ConfirmEmail/reshot-icon-email-time-NXYSCU5ZBQ.svg";
import useInput from "../../../hooks/use-input";
import TextField from "@mui/material/TextField";
import { Typography, Button, Card, Stack, Grid } from "@mui/material";
import classes from "../../Login Page/LoginPage.module.css";

const otpCheck = (val) => {
  return val.trim().length === 6 && val.trim().length !== 0;
};

const passwordCheck = (val) => {
  return val.trim().length > 6;
};

const NewOTPSent = () => {
  const navigate = useNavigate();
  let isFormValid = false;
  let arePasswordsMatching = false;

  const {
    value: otpValue,
    isValid: otpIsValid,
    valueChangeHandler: optChangeHandler,
    reset: otpReset,
  } = useInput(otpCheck);

  const {
    value: passwordValue,
    valueChangeHandler: passwordChangeHandler,
    reset: passwordReset,
  } = useInput(passwordCheck);

  const {
    value: confirmPasswordValue,

    valueChangeHandler: confirmPasswordChangeHandler,

    reset: confirmPasswordReset,
  } = useInput(passwordCheck);

  let emailFromLS = localStorage.getItem("user_name");

  let data = {
    user_name: emailFromLS,
    verification_code: otpValue,
    password: passwordValue,
  };

  const sendingOtpToAPI = async (val) => {
    const response = await fetch(process.env.REACT_APP_URL + "/v1/auth/forgotpassword", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(val),
    });
    console.log(val);
    const res = await response.json();
    isFormValid = false;

    console.log(res);

    if (res.status === "success") {
      navigate("/passwordChanged");
    } else {
      navigate("/passwordRejected ");
    }
  };

  if (passwordValue === confirmPasswordValue) {
    arePasswordsMatching = true;
    isFormValid = true;
  }

  const buttonClickHandler = () => {
    if (otpIsValid && arePasswordsMatching) {
      sendingOtpToAPI(data);
    }
    otpReset();
    passwordReset();
    confirmPasswordReset();
  };

  return (
    <div className={classes["gradient-background-otp"]}>
      <Grid
        display={"flex"}
        justifyContent="center"
        alignItems="center"
        minWidth="100vh"
        container
        spacing={2}
        sx={{ paddingTop: 2 }}
      >
        <Grid item>
          <Card
            sx={{
              width: 400,
              paddingTop: 10,
              paddingBottom: 8,
              paddingLeft: 4,
              paddingRight: 4,
              borderRadius: 4,
            }}
          >
            <Stack>
              <Grid
                container
                spacing={0}
                direction="column"
                alignItems={"center"}
                justify="center"
              >
                <img src={VerifyEmailSVG} alt="" />
              </Grid>
              <Grid
                container
                spacing={0}
                direction="column"
                alignItems={"center"}
                justify="center"
              >
                <Typography variant="h4" sx={{ alignItems: "center", mt: 4 }}>
                  Enter OTP
                </Typography>
              </Grid>
              <Typography sx={{ mt: 2 }} variant="body1" color="initial">
                An OTP has been sent to ******{emailFromLS.slice(5)}
              </Typography>
              <Typography sx={{ mt: 1 }} variant="body1" color="initial">
                Please check and confirm it.
              </Typography>
              <TextField
                sx={{ mt: 5 }}
                id="otp"
                label="OTP"
                type="number"
                autoFocus
                variant="outlined"
                optChangeHandler
                onChange={optChangeHandler}
              />
              <TextField
                sx={{ mt: 5 }}
                id="password"
                type="password"
                label="New Password"
                variant="outlined"
                onChange={passwordChangeHandler}
              />
              <TextField
                sx={{ mt: 5 }}
                id="confirmpassword"
                type="password"
                label="Confirm Password"
                variant="outlined"
                onChange={confirmPasswordChangeHandler}
              />
              <Button
                disabled={!isFormValid}
                sx={{ mt: 10 }}
                onClick={buttonClickHandler}
                variant="contained"
              >
                Submit
              </Button>
            </Stack>
          </Card>
        </Grid>
      </Grid>
    </div>
  );
};

export default NewOTPSent;
