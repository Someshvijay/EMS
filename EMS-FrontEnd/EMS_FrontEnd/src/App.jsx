import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import UserProfile from "./components/profile/user_profile";
import CreateUser from "./components/addUser/CreateUser";
import EditUser from "./components/editUser/EditUser";
import Login from "./components/login/Login";
import Sidebar from "./components/sidebar/Sidebar";
import Layout from "./layout/Layout";
import { AuthProvider } from "./context/AuthContext";
import PrivateRoute from "./context/PrivateRoute";
import Unauthorized from "./components/unauthorized/Unauthorized";
import UnauthorizedLayout from "./layout/UnauthorizedLayout";
import UsersList from "./components/usersList/UsersList";
import UsersPage from "./pages/UserPages";

function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route index path="/login" element={<Login />} />

        {/* Route for Unauthorized Access */}
        <Route element={<UnauthorizedLayout />}>
          <Route path="/unauthorized" element={<Unauthorized />} />
        </Route>

        {/* Private Routes */}
        <Route
          element={
            <PrivateRoute allowedRoles={["admin", "user"]}>
              <Layout />
            </PrivateRoute>
          }
        >
          <Route path="/home" element={<UserProfile />} />
          <Route path="/edit/:id" element={<EditUser />} />
        </Route>

        <Route
          element={
            <PrivateRoute allowedRoles={["admin"]}>
              <Layout />
            </PrivateRoute>
          }
        >
          <Route path="/users" element={<UsersPage />} />
          <Route path="/add" element={<CreateUser />} />
          <Route path="/userslist" element={<UsersList />} />
        </Route>
      </Routes>
    </AuthProvider>
  );
}

export default App;
