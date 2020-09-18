import React, { useEffect, useState } from "react";
import { AppBar, Toolbar, IconButton } from "@material-ui/core";
import { StateProvider } from "../hooks/userStore";
import { makeStyles } from "@material-ui/core/styles";
import { Menu } from "@material-ui/icons";
import GroupDrawer from "../components/GroupDrawer/GroupDrawer";
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
}));
export default function () {
  const classes = useStyles();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [groups, setGroups] = useState();
  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };
  useEffect(() => {
    // axios.get()
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
          />
        </nav>
      </div>
    </StateProvider>
  );
}
