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
import ForgotPassword from "./components/forgotpassword/ForgotPassword";
import ResetPassword from "./components/forgotpassword/ResetPassword";
import PromoteToAdmin from "./components/promoteToAdmin/PromoteToAdmin";
import PrescriptionForm from "./components/prescription/prescriptionForm/PrescriptionForm";

function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route index path="/login" element={<Login />} />

        {/* Route for Unauthorized Access */}
        <Route element={<UnauthorizedLayout />}>
          <Route path="/unauthorized" element={<Unauthorized />} />
        </Route>

        {/* Public Routes */}
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />

        {/* Private Routes */}
        <Route
          element={
            <PrivateRoute allowedRoles={["admin", "user"]}>
              <Layout />
            </PrivateRoute>
          }
        >
          <Route path="/home" element={<UserProfile />} />
          <Route path="/profile" element={<PrescriptionForm />} />
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
          <Route path="/PTAdmin" element={<PromoteToAdmin />} />
        </Route>
      </Routes>
    </AuthProvider>
  );
}

export default App;
