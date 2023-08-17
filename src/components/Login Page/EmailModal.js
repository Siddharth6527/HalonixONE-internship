import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import TextField from "@mui/material/TextField";
import { useNavigate } from "react-router-dom";

import useInput from "../../hooks/use-input";

const emailCheck = (val) => {
  return val.trim().includes("@") && val.trim().length > 6;
};

const style = {
  display: "flex",
  alignItems: "center",
  flexDirection: "column",
  fontSize: 20 + "px",
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 600,
  height: 400,
  bgcolor: "background.paper",
  borderRadius: 10 + "px",
  boxShadow: 24,
  p: 4,
};

export default function EmailModal(props) {
  const navigate = useNavigate();
  let {
    value: enteredEmail,
    isValid: emailIsValid,
    valueChangeHandler: emailChangeHandler,
    inputBlurHandler: emailBlurHandler,
    reset: emailReset,
  } = useInput(emailCheck);

  const sendingEmailToAPI = async (userName) => {
    const response = await fetch(process.env.REACT_APP_URL + "/v1/auth/forgotpassword", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userName),
    });

    const res = await response.json();
  };

  const buttonClickHandler = (event) => {
    sendingEmailToAPI({ user_name: enteredEmail });
    localStorage.setItem("user_name", enteredEmail);
    emailReset();

    navigate("/createPassword");
  };

  return (
    <div>
      <Modal
        open={props.modalOpen}
        onClose={() => {
          props.setModalOpen(false);
        }}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography
            sx={{ fontSize: 30 + "px", color: "#495057" }}
            id="modal-modal-title"
            variant="h1.heading"
            component="h1"
          >
            Enter your Email
          </Typography>
          <Typography
            id="modal-modal-description"
            sx={{ mt: 2, fontSize: 18 }}
            variant="body1"
          >
            To proceed for Forgot Password, please Enter your Email.
          </Typography>
          <TextField
            sx={{ width: 60 + "%", mt: 3 }}
            id="outlined-basic"
            label="Email"
            variant="outlined"
            required="required"
            type="email"
            onChange={emailChangeHandler}
            value={enteredEmail}
            onBlur={emailBlurHandler}
          />
          <Button
            sx={{ mt: 10, width: 60 + "%" }}
            onClick={buttonClickHandler}
            disabled={!emailIsValid}
            type="button"
            variant="contained"
          >
            Confirm
          </Button>
        </Box>
      </Modal>
    </div>
  );
}
