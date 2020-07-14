import { useState, useEffect } from "react";
import axios from "axios";
import { Cookies } from "react-cookie";
const cookies = new Cookies();
export default function () {
  const [form, setForm] = useState({ phone: "", password: "" });
  const [token, setToken] = useState({ token: cookies.get("token") } || null);
  const [authStatus, setAuthStatus] = useState(token ? "loggedIn" : "home");
  const apiEndpoint = process.env.backendURL || "https://production";
  // const initialState = {
  //   form: {phone: "", password: ""},
  //   token: cookies.get("token")
  // }
  // function reducer(state, action) {
  //   switch (action.type) {
  //     case 'login':
  //       try {
  //         const res = await axios.post(`${apiEndpoint}/api/login`, {
  //           user: {
  //             phone: form.phone,
  //             password: form.password,
  //           },
  //         });
  //         cookies.set("jwtToken", res.headers.authorization);
  //         setToken(res.headers.authorization)
  //       } catch (err) {
  //         console.log(err);
  //       }
  //   }
  // }
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
      setAuthStatus("home");
    } catch (err) {
      console.log(err);
    }
  };
  return {
    form,
    handleOnChange,
    handleLogin,
    handleLogout,
    setAuthStatus,
    authStatus,
    token,
  };
}
