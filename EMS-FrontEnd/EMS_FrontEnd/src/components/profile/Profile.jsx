import React from "react";
import {
  Container,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Typography,
  AppBar,
  useMediaQuery,
} from "@mui/material";

import { Link } from "react-router-dom";
import { useTheme } from "@mui/material/styles";
import "./profilepagestyles.css";

export default function ProfilePage(props) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <section className="profile-section">
      <Container sx={{ py: 5 }}>
        <Grid container spacing={4}>
          <Grid
            item
            lg={4}
            xs={12}
            md={4}
            className="photo"
            sx={{
              position: isMobile ? "static" : "fixed",
              width: isMobile ? "100%" : "300px",
            }}
          >
            <Card sx={{ mb: 4 }}>
              <CardContent className="card-content">
                <CardMedia
                  component="img"
                  src={
                    props.obj.gender === "Male"
                      ? "https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava3.webp"
                      : "https://static.vecteezy.com/system/resources/previews/002/002/297/non_2x/beautiful-woman-avatar-character-icon-free-vector.jpg"
                  }
                  alt="avatar"
                  className="card-media rounded-circle"
                  sx={{
                    width: isMobile ? "100px" : "140px",
                  }}
                />

                <hr />

                <Typography variant="body2" color="text.secondary" gutterBottom>
                  {props.obj.role.toUpperCase()}
                </Typography>

                <Typography variant="body2" color="text.secondary" gutterBottom>
                  Employee ID: {props.obj.id}
                </Typography>

                <div className="d-flex justify-content-center mb-1">
                  <Link
                    className="btn btn-outline-primary"
                    path={"product/:id"}
                    to={"/edit/" + props.obj.id}
                  >
                    Edit Profile
                  </Link>
                </div>
              </CardContent>
            </Card>
          </Grid>

          <Grid
            item
            lg={8}
            xs={12}
            md={8}
            sx={{ marginLeft: isMobile ? "0" : "300px" }}
          >
            <Card sx={{ mb: 4 }}>
              <CardContent>
                <Grid container spacing={2}>
                  {/* First Name */}
                  <Grid item xs={12}>
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      component="div"
                      sx={{ display: "flex", justifyContent: "flex-start" }}
                    >
                      <span className="details-label">First Name</span>{" "}
                      <span className="details-value">
                        {props.obj.firstname}
                      </span>
                    </Typography>
                  </Grid>

                  {/* Last Name */}
                  <Grid item xs={12}>
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      component="div"
                      sx={{ display: "flex", justifyContent: "flex-start" }}
                    >
                      <hr />
                      <span className="details-label">Last Name</span>{" "}
                      <span className="details-value">
                        {props.obj.lastname}
                      </span>
                    </Typography>
                  </Grid>

                  {/* Email */}
                  <Grid item xs={12}>
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      component="div"
                      sx={{ display: "flex", justifyContent: "flex-start" }}
                    >
                      <span className="details-label">Email</span>{" "}
                      <span className="details-value">{props.obj.email}</span>
                    </Typography>
                  </Grid>

                  {/* Mobile Number */}
                  <Grid item xs={12}>
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      component="div"
                      sx={{ display: "flex", justifyContent: "flex-start" }}
                    >
                      <span className="details-label">Mobile Number</span>{" "}
                      <span className="details-value">
                        {props.obj.mobilenumber}
                      </span>
                    </Typography>
                  </Grid>

                  {/* Emergency Number */}
                  <Grid item xs={12}>
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      component="div"
                      sx={{ display: "flex", justifyContent: "flex-start" }}
                    >
                      <span className="details-label">Emergency Number</span>{" "}
                      <span className="details-value">
                        {props.obj.emergencynumber}
                      </span>
                    </Typography>
                  </Grid>

                  {/* Blood Group */}
                  <Grid item xs={12}>
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      component="div"
                      sx={{ display: "flex", justifyContent: "flex-start" }}
                    >
                      <span className="details-label">Blood Group</span>{" "}
                      <span className="details-value">
                        {props.obj.bloodgroup}
                      </span>
                    </Typography>
                  </Grid>

                  {/* Gender */}
                  <Grid item xs={12}>
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      component="div"
                      sx={{ display: "flex", justifyContent: "flex-start" }}
                    >
                      <span className="details-label">Gender</span>{" "}
                      <span className="details-value">{props.obj.gender}</span>
                    </Typography>
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
