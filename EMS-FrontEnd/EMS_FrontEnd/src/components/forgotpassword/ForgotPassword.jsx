import React, { useState } from "react";
import {
  TextField,
  Button,
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
} from "@mui/material";
import axios from "../../api/axiosConfig";
import { useNavigate } from "react-router-dom";
import SendIcon from '@mui/icons-material/Send';

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const navigate = useNavigate();


  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("/api/forgot-password", { email });
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
            Forgot Password
          </Typography>
          <form onSubmit={handleSubmit}>
            <Grid  container spacing={2} justifyContent="center" alignItems="center" style={{marginTop:5}}>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  label="Email"
                  type="email"
                  fullWidth
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
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
                      marginTop: 10,
                    }}
                    onClick={() => navigate("/login")}
                  >
                    Go Back to login?
                  </Typography>
                </Grid>
              )}
              <Grid container spacing={2} justifyContent="center" alignItems="center" style={{marginTop:10}}>
                <Grid item xs={5}>
                  <Button
                    type="Back"
                    variant="contained"
                    color="primary"
                    fullWidth
                    onClick={() => navigate("/login")}
                  >
                    Back to Login
                  </Button>
                </Grid>
                <Grid item xs={5}>
                  <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    endIcon={<SendIcon />}
                    fullWidth
                  >
                    Send Reset Link
                  </Button>
                </Grid>
              </Grid>
            </Grid>
          </form>
        </CardContent>
      </Card>
    </Container>
  );
};

export default ForgotPassword;
