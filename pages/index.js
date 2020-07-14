import Head from "next/head";
import React, { useState, useEffect } from "react";
import Link from "next/link.js";
import { Button, TextField } from "@material-ui/core";
import useAuth from "../hooks/useAuth";
import AuthForm from "../components/authForm";

export default function Home() {
  const { handleOnChange, handleLogin, handleLogout, form, token, setAuthStatus, authStatus } = useAuth();

  return (
    <div className="container">
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {authStatus === "login" && (
        <AuthForm handleOnChange={handleOnChange} handleLogin={handleLogin} />
      )}
      {authStatus === "signUp" && (
        <AuthForm
          handleOnChange={handleOnChange}
          handleRegister={handleRegister}
        />
      )}
      {authStatus === "home" && (
        <div className="btn-container">
          <Button
            variant="contained"
            color="primary"
            onClick={() => setAuthStatus("signUp")}
          >
            Sign up
          </Button>
          <Button
            variant="outlined"
            color="primary"
            onClick={() => setAuthStatus("login")}
          >
            Login
          </Button>
        </div>
      )}
      {authStatus === "loggedIn" && (
        <div>
          <Button onClick={handleLogout}>Log out</Button>
          <div>logged in</div>
        </div>
      )}
    </div>
  );
}
