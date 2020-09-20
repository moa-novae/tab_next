import axios from "axios";
const apiEndpoint = process.env.backendURL || "https://production";

const getGroups = async function (token) {
  const res = await axios.get(`${apiEndpoint}/api/groups`, {
    headers: {
      Authorization: token,
    },
  });
  return res.data.groups;
};

const getProfile = async function (token) {
  const res = await axios.get(`${apiEndpoint}/api/profile`, {
    headers: {
      Authorization: token,
    },
  });
  return res.data;
};

export { getGroups, getProfile };
