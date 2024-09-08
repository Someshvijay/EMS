import React, { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import axios from "../../api/axiosConfig";
import {
    TextField,
    Button,
    Container,
    Typography,
    Grid,
    Card,
    CardContent,
  } from "@mui/material";

const ResetPassword = () => {
  const [searchParams] = useSearchParams();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");

  const navigate = useNavigate();

  const token = searchParams.get("token");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setMessage("Passwords do not match");
      return;
    }

    try {
      const response = await axios.post("/api/reset-password", {
        token,
        password,
      });
      setMessage(response.data.message);
    } catch (error) {
      setMessage(error.response.data.message || "Something went wrong.");
    }
  };

  return (
    <Container maxWidth="sm">
      <Card sx={{ mt: 8 }}>
        <CardContent>
          <Typography variant="h5" align="center">
            Reset Password
          </Typography>
          <form onSubmit={handleSubmit}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  label="New Password"
                  type="password"
                  fullWidth
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  label="Confirm New Password"
                  type="password"
                  fullWidth
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                />
              </Grid>
              {message && (
                <Grid item xs={12} style={{ textAlign: "center" }}>
                  <Typography variant="body2" color="error" align="center">
                    {message}
                  </Typography>
                  <Typography
                    variant="body2"
                    style={{
                      color: "blue",
                      cursor: "pointer",
                      textDecoration: "underline",
                      marginTop:10
                    }}
                    onClick={() => navigate("/login")}
                  >
                    Go Back to login?
                  </Typography>
                </Grid>
              )}
              <Grid item xs={12}>
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  fullWidth
                >
                  Reset Password
                </Button>
              </Grid>
            </Grid>
          </form>
        </CardContent>
      </Card>
    </Container>
  );
};

export default ResetPassword;
