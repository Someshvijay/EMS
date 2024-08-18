import React, { useState, useEffect } from "react";
import {
  Container,
  Grid,
  Card,
  CardContent,
  TextField,
  Typography,
  Button,
} from "@mui/material";

import { useParams } from "react-router-dom";
import api from "../../api/axiosConfig";
import "../profile/profilepagestyles.css";

export default function EditUser() {
  const { id } = useParams(); // Get the user ID from the URL
  const [user, setUser] = useState({
    firstname: "",
    lastname: "",
    email: "",
    mobilenumber: "",
    emergencynumber: "",
    bloodgroup: "",
    gender: "",
  });

  // Fetch user data when the component loads
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await api.get(`/api/v1/users/${id}`);
        setUser(response.data);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUser();
  }, [id]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const handleUpdateUser = async () => {
    try {
      const response = await api.put(`/api/v1/users/${id}`, user);
      console.log("User updated:", response.data);
    } catch (error) {
      console.error("Error updating user:", error);
    }
  };

  return (
    <section className="profile-section">
      <Container sx={{ py: 5 }}>
        <Grid container spacing={4}>
          <Grid item lg={8} marginLeft={"auto"} marginRight={"auto"}>
            <Card sx={{ mb: 4 }}>
              <CardContent>
                <Typography variant="h5" sx={{ mb: 3 }}>
                  Edit User
                </Typography>
                <Grid container spacing={2}>
                  {/* First Name */}
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="First Name"
                      name="firstname"
                      value={user.firstname}
                      onChange={handleInputChange}
                    />
                  </Grid>

                  {/* Last Name */}
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Last Name"
                      name="lastname"
                      value={user.lastname}
                      onChange={handleInputChange}
                    />
                  </Grid>

                  {/* Email */}
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Email"
                      name="email"
                      value={user.email}
                      onChange={handleInputChange}
                    />
                  </Grid>

                  {/* Mobile Number */}
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Mobile Number"
                      name="mobilenumber"
                      value={user.mobilenumber}
                      onChange={handleInputChange}
                    />
                  </Grid>

                  {/* Emergency Number */}
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Emergency Number"
                      name="emergencynumber"
                      value={user.emergencynumber}
                      onChange={handleInputChange}
                    />
                  </Grid>

                  {/* Blood Group */}
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Blood Group"
                      name="bloodgroup"
                      value={user.bloodgroup}
                      onChange={handleInputChange}
                    />
                  </Grid>

                  {/* Gender */}
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Gender"
                      name="gender"
                      value={user.gender}
                      onChange={handleInputChange}
                    />
                  </Grid>

                  {/* Update Button */}
                  <Grid item xs={12}>
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={handleUpdateUser}
                    >
                      Update User
                    </Button>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </section>
  );
}