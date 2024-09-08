import React, { useState, useEffect } from "react";
import {
  Container,
  Grid,
  Card,
  CardContent,
  TextField,
  Typography,
  Button,
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  useMediaQuery,
  useTheme,
} from "@mui/material";

import { useParams } from "react-router-dom";
import api from "../../api/axiosConfig";
import "../profile/profilepagestyles.css";

import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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
        toast.error("Error fetching user data", {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 3000, // Auto-close after 3 seconds
        });
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
      toast.success("User updated successfully!", {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 3000, // Auto-close after 3 seconds
      });
    } catch (error) {
      console.error("Error updating user:", error);
      toast.error("Failed to update user. Please try again.", {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 3000, // Auto-close after 3 seconds
      });
    }
  };

  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const isMediumScreen = useMediaQuery(theme.breakpoints.between("sm", "md"));

  return (
    <section className="profile-section">
      <Container
        sx={{
          py: 5,
          width: isSmallScreen
            ? "90vw" // For small screens
            : isMediumScreen
            ? "75vw" // For medium screens
            : "50vw", // For large screens
          minHeight: isSmallScreen ? "90vh" : "75vh",
        }}
      >
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

                  {/* Blood Group and Gender */}
                  <Grid item xs={12}>
                    <Box
                      display="flex"
                      justifyContent="space-between"
                      alignItems="center"
                      flexDirection={{ xs: "column", sm: "row" }}
                    >
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
                          <MenuItem value={"A+"}>A+ve</MenuItem>
                          <MenuItem value={"A-"}>A-ve</MenuItem>
                          <MenuItem value={"B+"}>B+ve</MenuItem>
                          <MenuItem value={"B-"}>B-ve</MenuItem>
                          <MenuItem value={"AB+"}>AB+ve</MenuItem>
                          <MenuItem value={"AB-"}>AB-ve</MenuItem>
                          <MenuItem value={"O+"}>O+ve</MenuItem>
                          <MenuItem value={"O-"}>O-ve</MenuItem>
                        </Select>
                      </FormControl>

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
      <ToastContainer />
    </section>
  );
}
