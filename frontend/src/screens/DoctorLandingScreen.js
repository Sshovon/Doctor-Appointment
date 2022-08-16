import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import {
  CardActionArea,
  Button,
  CardActions,
  tableBodyClasses,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import SearchBar from "../components/SearchBar";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

const DoctorLandingScreen = () => {
  if (window.localStorage.getItem("reload")) {
    window.localStorage.removeItem("reload");
    window.location.reload();
  }
  const [appointments, setAppointments] = useState([]);
  const navigate = useNavigate();
  const [hasAppointments, setHasAppointments] = useState(true);

  const clickhandler = (id) => {};

  const getappointments = async () => {
    await axios
      .get("/appointment/view")
      .then(function (response) {
        // console.log(response.data);
        setAppointments(response.data);
        setHasAppointments(false);
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  const unvisitedAppointments = appointments.filter((el) => {
    return !el.visited && !el.expired;
  });

  const todayAppointment = unvisitedAppointments.filter((el) => {
    const today = new Date().toLocaleDateString().replaceAll("/", "-");
    const savedDate = el.schedule.split(" ")[0];
    return today == savedDate;
  });
  // console.log(todayAppointment);
  const nextAppointments = unvisitedAppointments.filter((el) => {
    const today = new Date().toLocaleDateString().replaceAll("/", "-");
    const savedDate = el.schedule.split(" ")[0];
    return today != savedDate;
  });
  // console.log(nextAppointments);

  useEffect(() => {
    appointments.length === 0 && hasAppointments && getappointments();
    console.log(appointments);
  }, [appointments]);

  // backgroundImage: "url(/bg.webp)",
  return (
    
      <div style={{ backgroundSize:'cover', paddingBottom:'10px'}}>
        {
          (window.localStorage.getItem("userEmail")) && 
          <>
        {appointments.length > 0 && (
          <SearchBar placeholder="Search by name" data={appointments} />
        )}
        <Box sx={{ flexGrow: 1 }} style={{ margin: "25px", backgroundColor:'transparent' }}>
          {todayAppointment.length > 0 && (
            <h4 style={{color:'black'}}>Today's Appoinments</h4>
          )}
          <Grid container spacing={2}>
          {/* edded8 */}
            {todayAppointment.length > 0 ? (
              todayAppointment.map((el, key) => {
                return (
                  <Grid item xs={3} key={key}>
                    <Item style={{ backgroundColor: "transparent" }}>
                      <Card style={{ backgroundColor: "transparent" }}>
                        <CardActionArea
                          onClick={() => {
                            window.localStorage.setItem("id", el.ID);
                            navigate("/prescribe");
                          }}
                        >
                          <CardContent>
                            <Typography
                              gutterBottom
                              variant="h5"
                              component="div"
                            >
                            {/* <i class="fas fa-ban" style={{color:"#FF0000"}}> name</i> */}

                            {el.patient[0].name}
                            </Typography>
                            <Typography
                              variant="button"
                              color="text.secondary"
                              component="div"
                            >
                              Date : {el.schedule.split(" ")[0]}
                            </Typography>
                            <Typography
                              variant="button"
                              color="text.secondary"
                              component="div"
                            >
                              Time : {el.schedule.split(" ")[1]} pm
                            </Typography>
                            <Typography
                              variant="caption"
                              color="text.primary"
                              component="div"
                            >
                              <b>Appointment ID: {el.ID}</b>
                            </Typography>
                          </CardContent>
                        </CardActionArea>
                      </Card>
                    </Item>
                  </Grid>
                );
              })
            ) : (
              <div>
                <h4 style={{color:'black', marginLeft:"18px"}}>No Appointments Today</h4>
              </div>
            )}
          </Grid>
        </Box>

        <Box sx={{ flexGrow: 1 }} style={{ margin: "25px" }}>
          {nextAppointments.length > 0 && (
            <h4 style={{color:'black'}}>Upcoming Appoinments</h4>
          )}
          <Grid container spacing={2}>:
            {nextAppointments.length > 0 ? (
              nextAppointments.map((el, key) => {
                // b5dee6
                return (
                  <Grid item xs={3} key={key}>
                    <Item style={{ backgroundColor: "transparent" }}>
                      <Card style={{backgroundColor:'transparent'}}>
                        <CardActionArea
                          onClick={() => {
                            window.localStorage.setItem("id", el.ID);
                            navigate("/prescribe");
                          }}
                        >
                          <CardContent>
                            <Typography
                              gutterBottom
                              variant="h5"
                              component="div"
                            >
                              {el.patient[0].name}
                            </Typography>
                            <Typography
                              variant="button"
                              color="text.secondary"
                              component="div"
                            >
                              Date : {el.schedule.split(" ")[0]}
                            </Typography>
                            <Typography
                              variant="button"
                              color="text.secondary"
                              component="div"
                            >
                              Time : {el.schedule.split(" ")[1]} pm
                            </Typography>
                            <Typography
                              variant="caption"
                              color="text.primary"
                              component="div"
                            >
                              <b>Appointment ID: {el.ID}</b>
                            </Typography>
                          </CardContent>
                        </CardActionArea>
                      </Card>
                    </Item>
                  </Grid>
                );
              })
            ) : (
              <div>
                <h4>No Upcoming Appointments</h4>
              </div>
            )}
          </Grid>
        </Box>
        </>
}
      </div>
    
  );
};

export default DoctorLandingScreen;
