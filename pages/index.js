import Head from "next/head";
import React, { useState, useEffect } from "react";
import Link from "next/link.js";
import { Button, TextField } from "@material-ui/core";
import useAuth from "../hooks/useAuth";
import axios from "axios";

export default function Home() {
  const { handleOnChange, handleLogin, form, token } = useAuth();
  const [authStatus, setAuthStatus] = useState(token ? "loggedIn" : "home");
  useEffect(()=> {
    if (token) {
      setAuthStatus("loggedIn")
    }
  })
  return (
    <div className="container">
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {authStatus === "login" && (
        <form>
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
            onClick={() => {handleLogin()
            }}
          >
            Login
          </Button>
        </form>
      )}
      {authStatus === "signUp" && (
        <form>
          <TextField label="Phone Number" variant="filled" />
          <TextField
            label="Password"
            variant="filled"
            type="password"
            autoComplete="current-password"
          />
          <Button variant="contained" color="primary">
            Sign Up
          </Button>
        </form>
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
          logged in
        </div>
      )}
    </div>
  );
}
