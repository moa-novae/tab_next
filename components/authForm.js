import { Button, TextField } from "@material-ui/core";
import React from "react";
import style from "./authForm.module.scss";

export default function (props) {
  //renders register or login depending which is needed
  const {
    handleOnChange,
    handleLogin,
    handleRegister,
    setModalVisibility,
  } = props;
  const handleAuth = handleLogin || handleRegister;
  const actionText = handleLogin ? "Login" : "Sign Up";
  const switchText = handleLogin ? "Sign Up" : "Login";
  //if register, swap to login modal, and vice versa
  const toggleBetweenRegisterLogin = () => {
    setModalVisibility((prev) =>
      Object.fromEntries(Object.entries(prev).map(([k, v]) => [k, !v]))
    );
  };
  return (
    <div className={style.modal}>
      {/* allow user to input new name when registering  */}
      {handleRegister && (
        <TextField
          label="Username"
          variant="filled"
          name="name"
          onChange={handleOnChange}
        />
      )}
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
      <Button
        onClick={toggleBetweenRegisterLogin}
      >{`I want to ${switchText}`}</Button>
    </div>
  );
}
