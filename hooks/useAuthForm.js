import { logIn, logout, register } from "../services/authServices";
import { useState, useContext, useEffect } from "react";
import { userStore } from "./userStore";
import useForm from "./useForm";
import { Cookies } from "react-cookie";
const cookies = new Cookies();
export default function () {
  const token = cookies.get("jwtToken");
  const userState = useContext(userStore);
  const { form, setForm, formError, setFormError, handleOnChange } = useForm({
    name: "",
    phone: "",
    password: "",
  });
  // If token exists, user is logged in
  const [authStatus, setAuthStatus] = useState(token ? "loggedIn" : "home");
  const [modalVisibility, setModalVisibility] = useState({
    register: false,
    login: false,
  });

  // if token exists already in cookies, check if token is valid
  useEffect(() => {
    if (token) {
      handleLogin();
    }
  }, []);

  const handleLogin = async function () {
    //get jwt token and store in cookie
    try {
      await logIn(form.phone, form.password);
      setAuthStatus("loggedIn");
      setModalVisibility({ register: false, login: false });
    } catch (err) {
      if (err.response?.status === 401) {
        //set auth form error
        setFormError((prev) => ({
          ...prev,
          password: "User or password incorrect",
        }));
        setAuthStatus("home");
      } else {
        console.log(err);
      }
    }
  };
  const handleLogout = async function () {
    try {
      await logout(token);
      setToken(null);
      setAuthStatus("home");
      setModalVisibility({ register: false, login: false });
    } catch (err) {
      console.log(err);
    }
  };
  const handleRegister = async function () {
    try {
      await register(form.name, form.phone, form.password);
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
