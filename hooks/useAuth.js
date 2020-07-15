import { useState, useEffect } from "react";
import axios from "axios";
import { Cookies } from "react-cookie";
const cookies = new Cookies();
export default function () {
  const [form, setForm] = useState({ name: "", phone: "", password: "" });
  const [token, setToken] = useState(cookies.get("jwtToken") || null);
  const [authStatus, setAuthStatus] = useState(token ? "loggedIn" : "home");
  const [modalVisibility, setModalVisibility] = useState({
    register: false,
    login: false,
  });
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
      const res = await axios.post(`${apiEndpoint}/api/login`, {
        user: {
          phone: form.phone,
          password: form.password,
        },
      });
      cookies.set("jwtToken", res.headers.authorization);
      setToken(res.headers.authorization);
      setAuthStatus("loggedIn");
      setModalVisibility({ register: false, login: false });
    } catch (err) {
      console.log(err);
    }
  };
  const handleLogout = async function () {
    try {
      await axios.delete(`${apiEndpoint}/api/logout`, {
        headers: {
          Authorization: token,
        },
      });
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
      await axios.post(`${apiEndpoint}/api/signup`, {
        user: {
          name: form.name,
          phone: form.phone,
          password: form.password,
        },
      });
      handleLogin();
    } catch (err) {
      console.log(err);
    }
  };
  return {
    form,
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
