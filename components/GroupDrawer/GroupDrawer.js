import React, { useEffect } from "react";
import { List, MenuItem, Drawer, Hidden, Divider } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { getGroups } from "../../services/userServices";
import { Cookies } from "react-cookie";
const cookies = new Cookies();
const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  drawer: {
    [theme.breakpoints.up("sm")]: {
      width: drawerWidth,
      flexShrink: 0,
    },
  },
  drawerPaper: {
    width: drawerWidth,
  },
  toolbar: theme.mixins.toolbar,
}));

export default function ({
  mobileOpen,
  handleDrawerToggle,
  groups,
  setSelectedDrawerItem,
  selectedDrawerItem,
}) {
  const classes = useStyles();
  // MenuItem selected attribute is purely aesthetic, a true value leads to grey highlight
  const items = groups?.map((group) => (
    <MenuItem
      key={group.id}
      onClick={() => setSelectedDrawerItem(group.id)}
      selected={selectedDrawerItem === group.id}
    >
      {group.name}
    </MenuItem>
  ));
  const drawer = (
    <div>
      <div className={classes.toolbar} />
      <Divider />
      <List>
        <MenuItem
          onClick={() => setSelectedDrawerItem("HOME")}
          selected={selectedDrawerItem === "HOME"}
        >
          Home
        </MenuItem>
      </List>
      <List>{items}</List>
    </div>
  );

  return (
    <>
      <Hidden smUp implementation="css">
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          classes={{
            paper: classes.drawerPaper,
          }}
        >
          {drawer}
        </Drawer>
      </Hidden>
      <Hidden xsDown implementation="css">
        <Drawer
          variant="permanent"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          classes={{
            paper: classes.drawerPaper,
          }}
        >
          {drawer}
        </Drawer>
      </Hidden>
    </>
  );
}
