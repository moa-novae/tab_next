import React, { useEffect, useState } from "react";
import { AppBar, Toolbar, IconButton } from "@material-ui/core";
import { StateProvider } from "../hooks/userStore";
import { makeStyles } from "@material-ui/core/styles";
import { Menu } from "@material-ui/icons";
import GroupDrawer from "../components/GroupDrawer/GroupDrawer";
import UserProfile from "../components/UserProfile/UserProfile";
import { getGroups } from "../services/userServices";
import { Cookies } from "react-cookie";
import GroupProfile from "../components/GroupProfile/GroupProfile";
const cookies = new Cookies();

const drawerWidth = 240;
const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  drawer: {
    [theme.breakpoints.up("sm")]: {
      width: drawerWidth,
      flexShrink: 0,
    },
  },
  appBar: {
    [theme.breakpoints.up("sm")]: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth,
    },
  },
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up("sm")]: {
      display: "none",
    },
  },
  // necessary for content to be below app bar
  toolbar: theme.mixins.toolbar,
  drawerPaper: {
    width: drawerWidth,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
  contentInfo: {
    display: "flex",
    flexDirection: "column",
  },
}));
export default function () {
  const token = cookies.get("jwtToken");
  const classes = useStyles();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [groups, setGroups] = useState();
  const [selectedDrawerItem, setSelectedDrawerItem] = useState("HOME");
  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };
  useEffect(() => {
    getGroups(token).then((groups) => {
      setGroups(groups);
    });
  }, []);

  return (
    <StateProvider>
      <div className={classes.root}>
        <AppBar position="fixed" className={classes.appBar}>
          <Toolbar>
            <IconButton
              edge="start"
              onClick={handleDrawerToggle}
              className={classes.menuButton}
            >
              <Menu />
            </IconButton>
          </Toolbar>
        </AppBar>
        <nav className={classes.drawer}>
          <GroupDrawer
            mobileOpen={mobileOpen}
            handleDrawerToggle={handleDrawerToggle}
            groups={groups}
            selectedDrawerItem={selectedDrawerItem}
            setSelectedDrawerItem={setSelectedDrawerItem}
          />
        </nav>
        <main className={classes.content}>
          {/* spacing div */}
          <div className={classes.toolbar} />
          <div className={classes.contentInfo}>
            {selectedDrawerItem === "HOME" && <UserProfile />}
            {selectedDrawerItem !== "HOME" && (
              <GroupProfile
                group={groups?.find((g) => g.id === selectedDrawerItem)}
              />
            )}
          </div>
        </main>
      </div>
    </StateProvider>
  );
}
