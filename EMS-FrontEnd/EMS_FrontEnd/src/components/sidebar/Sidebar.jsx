import React, { useContext } from "react";
import {
  List,
  ListItem,
  ListItemText,
  Drawer,
  Typography,
} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import HomeIcon from "@mui/icons-material/Home";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import PeopleIcon from "@mui/icons-material/People";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import "./Sidebar.css";
import { AuthContext } from "../../context/AuthContext";

const Sidebar = () => {
  const { logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    localStorage.removeItem("user"); // Remove user from local storage
    navigate("/login"); // Redirect to login page
  };

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: 240,
        flexShrink: 0,
        [`& .MuiDrawer-paper`]: { width: 240, boxSizing: "border-box" },
      }}
    >
      <List>
        <ListItem>
          <Typography variant="h6">MyApp</Typography>
        </ListItem>
        <ListItem button component={Link} to="/home">
          <HomeIcon sx={{ marginRight: 1 }} />
          <ListItemText primary="Home" />
        </ListItem>
        <ListItem button component={Link} to="/profile">
          <AccountCircleIcon sx={{ marginRight: 1 }} />
          <ListItemText primary="Profile" />
        </ListItem>
        <ListItem button component={Link} to="/users">
          <PeopleIcon sx={{ marginRight: 1 }} />
          <ListItemText primary="Users" />
        </ListItem>
        <ListItem button onClick={handleLogout}>
          <ExitToAppIcon sx={{ marginRight: 1 }} />
          <ListItemText primary="Logout" />
        </ListItem>
      </List>
    </Drawer>
  );
};

export default Sidebar;
