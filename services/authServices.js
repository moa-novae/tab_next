import axios from "axios";
import { Cookies } from "react-cookie";
const cookies = new Cookies();
const apiEndpoint = process.env.backendURL || "https://production";

const logIn = async function (phone, password) {
  const res = await axios.post(`${apiEndpoint}/api/login`, {
    user: {
      phone,
      password,
    },
  });
  cookies.set("jwtToken", res.headers.authorization);
  return res;
};

const logout = async function (token) {
  const res = await axios.delete(`${apiEndpoint}/api/logout`, {
    headers: {
      Authorization: token,
    },
  });
  cookies.remove("jwtToken", { path: "/" });
  return res;
};

const register = async function (name, phone, password) {
  const res = await axios.post(`${apiEndpoint}/api/signup`, {
    user: {
      name,
      phone,
      password,
    },
  });
  logIn(phone, password);
  return await res;
};

export { logIn, logout, register };
