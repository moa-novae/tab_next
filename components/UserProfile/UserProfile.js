import React, { useEffect, useState } from "react";
import { getProfile } from "../../services/userServices";
import { Cookies } from "react-cookie";
import { makeStyles } from "@material-ui/core/styles";
const cookies = new Cookies();

const useStyles = makeStyles((theme) => ({
  userProfile: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "center",
  },
}));

export default function () {
  const classes = useStyles();
  const token = cookies.get("jwtToken");
  const [user, setUser] = useState();
  useEffect(() => {
    getProfile(token).then((profile) => setUser(profile));
  }, []);
  return (
    <div className={classes.userProfile}>
      <div>{user?.name}</div>
      <div>{user?.phone}</div>
      <div>{user?.email}</div>
      <div>{user?.user_overall_balance}</div>
    </div>
  );
}
