import { Button, TextField } from "@material-ui/core";
import React from "react";

export default function (props) {
  //renders register or login depending which is needed
  const { handleOnChange, handleLogin, handleRegister } = props;
  const handleAuth = handleLogin || handleRegister
  const actionText = handleLogin ? 'Login' : 'Register'
  return (
    <>
      <TextField
        label="Phone Number"
        variant="filled"
        name="phone"
        onChange={handleOnChange}
      />
      <TextField
        label="Password"
        variant="filled"
        type="password"
        autoComplete="current-password"
        name="password"
        onChange={handleOnChange}
      />
      <Button
        variant="contained"
        color="primary"
        onClick={() => {
          handleAuth();
        }}
      >
        {actionText}
      </Button>
    </>
  );
}
