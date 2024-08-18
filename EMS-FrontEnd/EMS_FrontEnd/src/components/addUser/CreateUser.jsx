import React, { useState } from "react";
import {
  Container,
  Grid,
  Card,
  CardContent,
  TextField,
  Typography,
  Button,
} from "@mui/material";

import api from "../../api/axiosConfig";
import "../profile/profilepagestyles.css";

export default function CreateUser() {
  const [user, setUser] = useState({
    firstname: "",
    lastname: "",
    email: "",
    mobilenumber: "",
    emergencynumber: "",
    bloodgroup: "",
    gender: "",
    password:"",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const handleCreateUser = async () => {
    try {
      const response = await api.post("/api/v1/users", user);
      console.log("User created:", response.data);
    } catch (error) {
      console.error("Error creating user:", error);
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
                  Create New User
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

                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Password"
                      name="password"
                      value={user.password}
                      onChange={handleInputChange}
                    />
                  </Grid>

                  {/* Submit Button */}
                  <Grid item xs={12}>
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={handleCreateUser}
                    >
                      Create User
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
