import { logIn, logout, register } from "../services/authServices";
import { useState, useContext, useEffect } from "react";
import { userStore } from "../hooks/userStore";
import axios from "axios";
import { Cookies } from "react-cookie";
const cookies = new Cookies();
export default function () {
  const userState = useContext(userStore);
  const [form, setForm] = useState({ name: "", phone: "", password: "" });
  const [formError, setFormError] = useState({
    name: "",
    phone: "",
    password: "",
  });
  const [token, setToken] = useState(cookies.get("jwtToken") || null);
  const [authStatus, setAuthStatus] = useState(token ? "loggedIn" : "home");
  const [modalVisibility, setModalVisibility] = useState({
    register: false,
    login: false,
  });

  // if token exists already in cookies, check if token valid
  useEffect(() => {
    if (token) {
      handleLogin();
    }
  }, []);
  const apiEndpoint = process.env.backendURL || "https://production";

  const handleOnChange = function (e) {
    const key = e.target.name;
    const value = e.target.value;
    setForm((prev) => {
      const newState = { ...prev };
      newState[key] = value.trim();
      return newState;
    });
  };
  const handleLogin = async function () {
    //get jwt token and store in cookie
    try {
      const res = await logIn(form.phone, form.password);
      cookies.set("jwtToken", res.headers.authorization);
      setToken(res.headers.authorization);
      setAuthStatus("loggedIn");
      setModalVisibility({ register: false, login: false });
    } catch (err) {
      if (err.response?.status === 401) {
        //set auth form error
        setFormError((prev) => ({
          ...prev,
          password: "User or password incorrect",
        }));
        // delete local token in cookie if any
        cookies.remove("jwtToken", { path: "/" });
        setAuthStatus("home");
      } else {
        console.log(err);
      }
    }
  };
  const handleLogout = async function () {
    try {
      const res = await logout(token);
      setToken(null);
      cookies.remove("jwtToken", { path: "/" });
      setAuthStatus("home");
      setModalVisibility({ register: false, login: false });
    } catch (err) {
      console.log(err);
    }
  };
  const handleRegister = async function () {
    try {
      const res = await register(form.name, form.phone, form.password);
      handleLogin();
    } catch (err) {
      console.log(err);
    }
  };
  return {
    form,
    formError,
    handleOnChange,
    handleLogin,
    handleLogout,
    handleRegister,
    setAuthStatus,
    authStatus,
    modalVisibility,
    setModalVisibility,
  };
}
