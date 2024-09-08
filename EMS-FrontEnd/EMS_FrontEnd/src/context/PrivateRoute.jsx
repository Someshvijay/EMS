import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from './AuthContext';

const PrivateRoute = ({ children, allowedRoles }) => {
    const { isAuthenticated, role } = useContext(AuthContext);
    const user = JSON.parse(localStorage.getItem('user'));
  
    // Redirect to login if not authenticated
    if (!isAuthenticated) return <Navigate to="/login" />;
  
    // Restrict access if the user's role is not allowed
    if (allowedRoles && !allowedRoles.includes(user?.role)) {
        return <Navigate to="/unauthorized" />;
      }
    return children;
  };

export default PrivateRoute;
