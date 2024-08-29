import React, { useState } from "react";
import {
  Container,
  Grid,
  Card,
  CardContent,
  TextField,
  Typography,
  Button,
  Select,
  InputLabel,
  MenuItem,
  FormControl,
  Box,
} from "@mui/material";

import api from "../../api/axiosConfig";
import "../profile/profilepagestyles.css";

import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function CreateUser() {
  const [user, setUser] = useState({
    firstname: "",
    lastname: "",
    email: "",
    mobilenumber: "",
    emergencynumber: "",
    bloodgroup: "",
    gender: "",
    password: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const handleCreateUser = async () => {
    try {
      const response = await api.post("/api/v1/users", user);
      console.log("User created:", response.data);
      toast.success("User created successfully!", {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 3000, // Auto-close after 3 seconds
      });
    } catch (error) {
      console.error("Error creating user:", error);
      toast.error("Error creating user. Please try again.", {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 3000, // Auto-close after 3 seconds
      });
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
                  <Box display="flex" justifyContent="space-between" alignItems="center" flexDirection={{ xs: "column", sm: "row" }}>
                    {/* <TextField
                      fullWidth
                      label="Blood Group"
                      name="bloodgroup"
                      value={user.bloodgroup}
                      onChange={handleInputChange}
                    /> */}
                    <FormControl sx={{ m: 1, minWidth: 220 }} size="large">
                    <InputLabel id="bloodgroup">Blood Group</InputLabel>
                    <Select
                      labelId="bloodgroup"
                      id="bloodgroup"
                      name="bloodgroup"
                      value={user.bloodgroup}
                      label="Blood Group"
                      onChange={handleInputChange}
                    >
                      <MenuItem value={'A+'}>A+ve</MenuItem>
                      <MenuItem value={"A-"}>A-ve</MenuItem>
                      <MenuItem value={"B+"}>B+ve</MenuItem>
                      <MenuItem value={"B-"}>B-ve</MenuItem>
                      <MenuItem value={"AB+"}>AB+ve</MenuItem>
                      <MenuItem value={"AB-"}>AB-ve</MenuItem>
                      <MenuItem value={"O+"}>O+ve</MenuItem>
                      <MenuItem value={"O-"}>O-ve</MenuItem>
                    </Select>
                    </FormControl>
                 

                  {/* Gender */}
                  
                    {/* <TextField
                      fullWidth
                      label="Gender"
                      name="gender"
                      value={user.gender}
                      onChange={handleInputChange}
                    /> */}
                    <FormControl sx={{ m: 1, minWidth: 220 }} size="large">
                    <InputLabel id="gender">Gender</InputLabel>
                    <Select
                      labelId="gender"
                      id="gender"
                      value={user.gender}
                      name="gender"
                      label="Gender"
                      onChange={handleInputChange}
                    >
                      <MenuItem value={"Male"}>Male</MenuItem>
                      <MenuItem value={"Female"}>Female</MenuItem>
                      <MenuItem value={"Other"}>Other</MenuItem>
                    </Select>
                    </FormControl>
                    </Box>
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
      <ToastContainer />
    </section>
  );
}
