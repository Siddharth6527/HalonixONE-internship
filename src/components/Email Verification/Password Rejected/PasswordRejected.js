import React from "react";
import { useNavigate } from "react-router-dom";
import { Grid, Card, Stack, Typography, Button } from "@mui/material";
import VerifyEmailSVG from "../../../Assets/ConfirmEmail/reshot-icon-email-error-XGMJKAE782.svg";

const PasswordRejected = () => {
  const navigate = useNavigate();

  const buttonClickHandler = () => {
    navigate("/login");
  };

  return (
    <Grid
      container
      display={"flex"}
      justifyContent="center"
      alignItems="center"
      minWidth="100vh"
      spacing={2}
    >
      <Grid item>
        <Card sx={{ maxWidth: 800, padding: 10 }}>
          <Stack alignItems={"center"}>
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
              item
              spacing={0}
              direction="column"
              alignItems={"center"}
              justify="center"
            >
              <Typography variant="h4" sx={{ mt: 5 }}>
                Sorry! Try Again
              </Typography>
            </Grid>
            <Typography variant="h6" color="initial" sx={{ mt: 2 }}>
              Check your Email ID and try again later.
            </Typography>
            <Button
              sx={{ mt: 10 }}
              fullWidth
              onClick={buttonClickHandler}
              variant="contained"
            >
              Try Again
            </Button>
          </Stack>
        </Card>
      </Grid>
    </Grid>
  );
};

export default PasswordRejected;
