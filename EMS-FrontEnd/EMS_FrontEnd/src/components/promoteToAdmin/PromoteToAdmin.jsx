import api from "../../api/axiosConfig";
import React, { useState, useEffect } from "react";
import {
  Container,
  Grid,
  Card,
  CardContent,
  Typography,
  Button,
  Modal,
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const PromoteToAdmin = () => {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [open, setOpen] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSelectedUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };

  const handleSave = async () => {
    try {
      // Update the role on the backend
      await api.put(`/api/v1/users/${selectedUser.id}/role`, {
        role: selectedUser.role, // Sending in the body
      });
  
      // Close the modal
      setOpen(false);
  
      // Optionally, refresh the user list
      fetchUsers();
      toast.success("User role updated successfully!", {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 3000, // Auto-close after 3 seconds
      });
    } catch (error) {
      console.error("Error updating user role:", error);
    }
  };
  

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
            <Card
              style={{
                height: "200px",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
              }}
            >
              <CardContent>
                <Typography
                  variant="h6"
                  style={{
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                  }}
                >
                  {user.firstname} {user.lastname}
                </Typography>
                <Grid item xs={12} style={{marginTop:10}}>

                <Typography variant="h7"

                  style={{
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                  }}
                >
                  {user.email}
                </Typography>
                <Typography/>
                <Typography
                variant="h7"
                  style={{
                      whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                  }}
                >
                   {user.role.charAt(0).toUpperCase() + user.role.slice(1).toLowerCase()}
                </Typography>
              </Grid>

              </CardContent>
              <Button
                variant="outlined"
                color="primary"
                onClick={() => handleOpen(user)}
                style={{ margin: "10px" }}
              >
                Change Permission?
              </Button>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Modal open={open} onClose={handleClose}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 400,
            bgcolor: "background.paper",
            boxShadow: 24,
            p: 4,
          }}
        >
          {selectedUser && (
            <>
              <Typography variant="h7">
                Do you want to give admin permissions to this user?<br/>
              </Typography>
              
              <Grid item xs={12}>
              <Box display="flex" justifyContent="space-between" alignItems="center" flexDirection={{ xs: "column", sm: "row" }}>
              <Typography variant="h8" style={{marginTop:20}}>
              {`${selectedUser.firstname} ${selectedUser.lastname.charAt(0)}`}
              </Typography> 
              <FormControl sx={{ m: 1, minWidth: 220 }} size="large" style={{marginTop:25}}>
                
                
                <InputLabel id="role-label">Role</InputLabel>
                <Select
                  labelId="role-label"
                  id="role"
                  value={selectedUser.role || ""}
                  name="role"
                  label="Role"
                  onChange={handleInputChange}
                >
                  <MenuItem value={"admin"}>Yes</MenuItem>
                  <MenuItem value={"user"}>No</MenuItem>
                </Select>
              </FormControl>
                </Box>
              </Grid>
              <Button
                variant="contained"
                color="primary"
                onClick={handleSave}
                sx={{ mt: 2 }}
              >
                Save Changes
              </Button>
            </>
          )}
        </Box>
      </Modal>
      <ToastContainer />
    </Container>
    
  );
};

export default PromoteToAdmin;
