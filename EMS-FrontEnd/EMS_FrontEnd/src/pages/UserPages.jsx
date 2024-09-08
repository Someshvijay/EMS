import React from "react";
import { useNavigate } from "react-router-dom";
import { Container, Grid, Card, CardContent, Typography, Button } from "@mui/material";

export default function UsersPage() {
  const navigate = useNavigate();

  const goToAddUser = () => {
    navigate("/add");
  };

  const goToUsersList = () => {
    navigate("/userslist");
  };


  const goToPromoteToAdmin = () => {
    navigate("/PTAdmin");
  };

  return (
    <Container sx={{ py: 5 }}>
      <Grid container spacing={4}>
        {/* Add User Card */}
        <Grid item lg={6}>
          <Card>
            <CardContent>
              <Typography variant="h5" gutterBottom>
                Add User
              </Typography>
              <Typography variant="body1" sx={{ mb: 2 }}>
                Click here to add a new user.
              </Typography>
              <Button
                variant="contained"
                color="primary"
                onClick={goToAddUser}
              >
                Go to Add User
              </Button>
            </CardContent>
          </Card>
        </Grid>

        {/* Users List Card */}
        <Grid item lg={6}>
          <Card>
            <CardContent>
              <Typography variant="h5" gutterBottom>
                Users List
              </Typography>
              <Typography variant="body1" sx={{ mb: 2 }}>
                Click here to view the list of users.
              </Typography>
              <Button
                variant="contained"
                color="primary"
                onClick={goToUsersList}
              >
                Go to Users List
              </Button>
            </CardContent>
          </Card>
        </Grid>
        <Grid item lg={6}>
          <Card>
            <CardContent>
              <Typography variant="h5" gutterBottom>
                Admin Permissions
              </Typography>
              <Typography variant="body1" sx={{ mb: 2 }}>
                Click here to make change to Admin.
              </Typography>
              <Button
                variant="contained"
                color="primary"
                onClick={goToPromoteToAdmin}
              >
                Go to Admin Permissions
              </Button>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
}
