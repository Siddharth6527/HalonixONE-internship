import React from "react";
import { useNavigate } from "react-router-dom";
import { Grid, Card, Stack, Typography, Button } from "@mui/material";
import VerifyEmailSVG from "../../../Assets/ConfirmEmail/reshot-icon-email-check-BAMWKH28V9.svg";
import classes from "../../Login Page/LoginPage.module.css";

const PasswordChanged = () => {
  const navigate = useNavigate();

  const buttonClickHandler = () => {
    navigate("/login");
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
        sx={{ pt: 2 }}
      >
        <Grid item>
          <Card sx={{ maxWidth: 800, padding: 10, borderRadius: 5 }}>
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
                <Typography variant="h4" sx={{ alignItems: "center", mt: 5 }}>
                  Thank You!
                </Typography>
              </Grid>
              <Typography variant="h6" color="initial" sx={{ mt: 2 }}>
                Your Password has been changed. Please try to login
              </Typography>

              <Button
                sx={{ mt: 10 }}
                onClick={buttonClickHandler}
                variant="contained"
              >
                Login
              </Button>
            </Stack>
          </Card>
        </Grid>
      </Grid>
    </div>
  );
};

export default PasswordChanged;
