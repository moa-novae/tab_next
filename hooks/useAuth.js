import { useState } from "react";
import axios from "axios";
import { Cookies } from "react-cookie";
const cookies = new Cookies();
export default function () {
  const [form, setForm] = useState({ phone: "", password: "" });
  const [token, setToken] = useState({ token: cookies.get("token") } || null);
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
    const apiEndpoint = process.env.backendURL || "https://production";
    try {
      const res = await axios.post(`${apiEndpoint}/api/login`, {
        user: {
          phone: form.phone,
          password: form.password,
        },
      });
      cookies.set("jwtToken", res.headers.authorization);
      setToken(res.headers.authorization)
    } catch (err) {
      console.log(err);
    }
  };
  return {
    form,
    handleOnChange,
    handleLogin,
    token
  };
}
