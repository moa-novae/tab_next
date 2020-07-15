import Head from "next/head";
import React, { useState, useEffect } from "react";
import Link from "next/link.js";
import { Button, Modal } from "@material-ui/core";
import useAuth from "../hooks/useAuth";
import AuthForm from "../components/authForm";

export default function Home() {
  const {
    handleOnChange,
    handleLogin,
    handleLogout,
    handleRegister,
    authStatus,
    modalVisibility,
    setModalVisibility,
  } = useAuth();

  return (
    <div className="container">
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {/* Login modal */}
      <Modal
        open={modalVisibility.login}
        onClose={() => {
          setModalVisibility({ register: false, login: false });
        }}
      >
        <AuthForm
          handleOnChange={handleOnChange}
          handleLogin={handleLogin}
          setModalVisibility={setModalVisibility}
        />
      </Modal>
      {/* Register modal */}
      <Modal
        open={modalVisibility.register}
        onClose={() => {
          setModalVisibility({ register: false, login: false });
        }}
      >
        <AuthForm
          handleOnChange={handleOnChange}
          handleRegister={handleRegister}
          setModalVisibility={setModalVisibility}
        />
      </Modal>

      {authStatus === "home" && (
        <div className="btn-container">
          <Button
            variant="contained"
            color="primary"
            onClick={() => setModalVisibility({ register: true, login: false })}
          >
            Sign up
          </Button>
          <Button
            variant="outlined"
            color="primary"
            onClick={() => setModalVisibility({ register: false, login: true })}
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
