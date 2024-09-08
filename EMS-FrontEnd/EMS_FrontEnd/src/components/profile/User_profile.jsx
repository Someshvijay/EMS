import React, { useEffect, useState } from "react";
import api from "../../api/axiosConfig";
import ProfilePage from "./profile";

export default function UserProfile() {
  const [user, setUser] = useState(null); // Store the logged-in user's data
  const [error, setError] = useState("");

  // Fetch logged-in user data from backend
  const getUserProfile = async (userId) => {
    try {
      const response = await api.get(`/api/v1/users/${userId}`);
      setUser(response.data);
    } catch (err) {
      console.log(err);
      setError("Failed to fetch user data");
    }
  };

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user")); // Get logged-in user's data from localStorage
    if (storedUser && storedUser.id) {
      getUserProfile(storedUser.id); // Fetch user's profile
    } else {
      setError("No user found");
    }
  }, []);

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <>
      {user ? <ProfilePage obj={user} /> : <p>Loading...</p>}
    </>
  );
}