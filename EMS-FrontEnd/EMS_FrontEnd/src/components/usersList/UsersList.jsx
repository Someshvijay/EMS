import React, { useState, useEffect } from "react";
import { Container, Grid, Card, CardContent, Typography, Button, Modal, Box } from "@mui/material";
import api from "../../api/axiosConfig";

export default function UsersList() {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await api.get("/api/v1/users");
      setUsers(response.data);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  const handleOpen = (user) => {
    setSelectedUser(user);
    setOpen(true);
  };

  const handleClose = () => setOpen(false);

  return (
    <Container sx={{ py: 5 }}>
      <Grid container spacing={4}>
  {users.map((user) => (
    <Grid item lg={4} key={user.id}>
      <Card style={{ height: "200px", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
        <CardContent>
          <Typography 
            variant="h6" 
            style={{ 
              whiteSpace: "nowrap", 
              overflow: "hidden", 
              textOverflow: "ellipsis" 
            }}
          >
            {user.firstname} {user.lastname}
          </Typography>
          <Typography
            style={{ 
              whiteSpace: "nowrap", 
              overflow: "hidden", 
              textOverflow: "ellipsis" 
            }}
          >
            Email: {user.email}
          </Typography>
          <Typography
            style={{ 
              whiteSpace: "nowrap", 
              overflow: "hidden", 
              textOverflow: "ellipsis" 
            }}
          >
            Mobile: {user.mobilenumber}
          </Typography>
        </CardContent>
        <Button
          variant="outlined"
          color="primary"
          onClick={() => handleOpen(user)}
          style={{ margin: "10px" }}
        >
          View Details
        </Button>
      </Card>
    </Grid>
  ))}
</Grid>


      <Modal open={open} onClose={handleClose}>
        <Box sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: 400, bgcolor: 'background.paper', boxShadow: 24, p: 4 }}>
          {selectedUser && (
            <>
              <Typography variant="h6">{selectedUser.firstname} {selectedUser.lastname}</Typography>
              <Typography>Email: {selectedUser.email}</Typography>
              <Typography>Mobile: {selectedUser.mobilenumber}</Typography>
              <Typography>Emergency: {selectedUser.emergencynumber}</Typography>
              <Typography>Blood Group: {selectedUser.bloodgroup}</Typography>
              <Typography>Gender: {selectedUser.gender}</Typography>
            </>
          )}
        </Box>
      </Modal>
    </Container>
  );
}
