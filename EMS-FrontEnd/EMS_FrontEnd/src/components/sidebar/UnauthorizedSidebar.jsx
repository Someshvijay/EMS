import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Drawer, List, ListItem, ListItemText, Typography } from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import './Sidebar.css'
import { AuthContext } from "../../context/AuthContext";

const UnauthorizedSidebar = () => {

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
        {/* Show only limited options */}
        <ListItem>
          <Typography variant="h6">MyApp</Typography>
        </ListItem>
        <ListItem button component={Link} to="/home">
          <HomeIcon sx={{ marginRight: 1 }} />
          <ListItemText primary="Home" />
        </ListItem>
        <ListItem button onClick={handleLogout}>
          <ExitToAppIcon sx={{ marginRight: 1 }} />
          <ListItemText primary="Logout" />
        </ListItem>
      </List>
    </Drawer>
   
  );
};

export default UnauthorizedSidebar;
