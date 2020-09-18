import Head from "next/head";
import React, { useEffect } from "react";
import classNames from "classnames";
import { Button, Modal, Grid } from "@material-ui/core";
import useAuth from "../hooks/useAuth";
import AuthForm from "../components/AuthForm/AuthForm";
import styles from "./index.module.scss";

export default function Home() {
  const {
    form,
    formError,
    handleOnChange,
    handleLogin,
    handleLogout,
    handleRegister,
    authStatus,
    modalVisibility,
    setModalVisibility,
  } = useAuth();
  const infoCardsContent = [
    {
      bgColour: "bgCharcoal",
      title: "Track balances",
      description: "Keep track of shared expenses, balances, and who owes who",
    },
    {
      bgColour: "bgTeal",
      title: "Organize expenses",
      description: "Split expenses with different goups of people",
    },
    {
      bgColour: "bgOrange",
      title: "Shame friends with SMS",
      description: "Send text messages to those who don't pay their share",
    },
    {
      bgColour: "bgPurple",
      title: "Ready to get started?",
      description: (
        <Button
          onClick={() => setModalVisibility({ register: true, login: false })}
        >
          Sign up now
        </Button>
      ),
    },
  ];

  const infoCards = infoCardsContent.map((cardContent) => (
    <Grid item xs={12} md={6} key={cardContent.title}>
      <div
        className={classNames(styles.infoCard, styles[cardContent.bgColour])}
      >
        <h2>{cardContent.title}</h2>
        <p>{cardContent.description}</p>
      </div>
    </Grid>
  ));
  return (
    <div>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className={styles.hero}>
        <div className={styles.intro}>
          <h1>Remove the stress of sharing expenses with friends</h1>
          <div className={styles.notebook}>
            <img src="/notebook.svg" />
          </div>
        </div>

        {authStatus === "home" && (
          <div className={styles.btnContainer}>
            <Button
              variant="contained"
              color="primary"
              onClick={() =>
                setModalVisibility({ register: true, login: false })
              }
            >
              Sign Up
            </Button>
            <Button
              variant="contained"
              color="default"
              onClick={() =>
                setModalVisibility({ register: false, login: true })
              }
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
      <Grid className={styles.info} container>
        {infoCards}
      </Grid>
      {/* Login modal */}
      <Modal
        open={modalVisibility.login}
        onClose={() => {
          setModalVisibility({ register: false, login: false });
        }}
      >
        <div>
          <AuthForm
            handleOnChange={handleOnChange}
            handleLogin={handleLogin}
            setModalVisibility={setModalVisibility}
            form={form}
            formError={formError}
          />
        </div>
      </Modal>
      {/* Register modal */}
      <Modal
        open={modalVisibility.register}
        onClose={() => {
          setModalVisibility({ register: false, login: false });
        }}
      >
        <div>
          <AuthForm
            handleOnChange={handleOnChange}
            handleRegister={handleRegister}
            setModalVisibility={setModalVisibility}
            form={form}
            formError={formError}
          />
        </div>
      </Modal>
    </div>
  );
}
