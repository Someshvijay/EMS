import React from "react";

import {
  Container,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Typography,
  AppBar,
} from "@mui/material";

import { Link } from "react-router-dom";

import "./profilepagestyles.css";

export default function ProfilePage(props) {
  return (
    <section className="profile-section">
      <Container sx={{ py: 5 }}>
        <Grid container spacing={4}>
          <Grid
            position={"fixed"}
            width={"300px"}
            item
            lg={4}
            className="photo"
          >
            <Card sx={{ mb: 4 }}>
              <CardContent className="card-content">
                <CardMedia
                  component="img"
                  src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava3.webp"
                  alt="avatar"
                  className="card-media rounded-circle"
                  sx={{ width: "140px" }}
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

          <Grid item lg={8} marginLeft={"300px"}>
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
