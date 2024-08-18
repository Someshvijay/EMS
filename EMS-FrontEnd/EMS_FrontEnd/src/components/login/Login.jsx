import React, { useState, useContext } from "react";
import { TextField, Button, Container, Typography, Grid, Card, CardContent } from "@mui/material";
import { useNavigate } from "react-router-dom";
import axios from "../../api/axiosConfig"; // Assuming you have axiosConfig in your api folder.
import { AuthContext } from "../../context/AuthContext";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { login } = useContext(AuthContext); 

  const handleLogin = async (e) => {
    e.preventDefault();
    setError(""); // Clear any previous errors
  
    try {
      const response = await axios.post("/api/v1/auth/login", {
        email,
        password,
      });
  
      if (response.status === 200) {
        const { role } = response.data;
  
        localStorage.setItem("user", JSON.stringify(response.data)); // Storing user info
        localStorage.setItem("role", role);  // Store the role
  
        login(); // Set isAuthenticated to true
        navigate("/home");  // Redirect to home or appropriate page
      } else {
        setError("Invalid email or password");
      }
    } catch (err) {
      setError("Invalid email or password");
    }
  };

  return (
    <Container maxWidth="sm">
      <Card sx={{ mt: 8 }}>
        <CardContent>
          <Typography variant="h5" align="center">
            Login
          </Typography>
          <form onSubmit={handleLogin}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  label="Email"
                  fullWidth
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  label="Password"
                  type="password"
                  fullWidth
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </Grid>
              {error && (
                <Grid item xs={12}>
                  <Typography variant="body2" color="error" align="center">
                    {error}
                  </Typography>
                </Grid>
              )}
              <Grid item xs={12}>
                <Button type="submit" variant="contained" color="primary" fullWidth>
                  Login
                </Button>
              </Grid>
            </Grid>
          </form>
        </CardContent>
      </Card>
    </Container>
  );
}
