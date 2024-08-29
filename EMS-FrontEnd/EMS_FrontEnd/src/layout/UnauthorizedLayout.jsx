import React from "react";
import { Outlet } from "react-router-dom";  // Used to render the child routes
import UnauthorizedSidebar from "../components/sidebar/UnauthorizedSidebar";


const UnauthorizedLayout = () => {
  return (
    <div style={{ display: "flex" }}>
      <UnauthorizedSidebar />  {/* Sidebar included */}
      <div style={{ flexGrow: 1, padding: "20px" }}>
        <Outlet />  {/* This will render the nested routes */}
      </div>
    </div>
  );
};

export default  UnauthorizedLayout;
