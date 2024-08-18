import React from "react";
import { Outlet } from "react-router-dom";  // Used to render the child routes
import Sidebar from "../components/sidebar/Sidebar";


const Layout = () => {
  return (
    <div style={{ display: "flex" }}>
      <Sidebar />  {/* Sidebar included */}
      <div style={{ flexGrow: 1, padding: "20px" }}>
        <Outlet />  {/* This will render the nested routes */}
      </div>
    </div>
  );
};

export default Layout;
