import {
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import React, { useState } from "react";
import { CountdownCircleTimer } from "react-countdown-circle-timer";
import { Form, Button } from "react-bootstrap";
import toast from "react-hot-toast";

import axios from "axios";

import FormContainer from "../components/FormContainer";
import AppointmentScreen from "./AppointmentScreen";
import Reschedule from "../components/Reschedule";

function RescheduleScreen() {
  const [apid, setApid] = useState("");
  const [nid, setNid] = useState("");
  const [otp, setOtp] = useState("");
  const [rs, setrs] = useState(true);
  const [key, setKey] = useState(0);
  const [open, setOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [verified, setVerified] = useState(false);
  
  const handleClose = () => {
    setOpen(false);
    setOtp("");
  };

  const handleResend = async () => {
    setKey((pk) => pk + 1);
    setrs(true);
    await handleOTP();
  };

  const handleOTP = async () => {
    const response = await axios.post("/otp/send", { email });
    console.log(response);
  };

  const checkCredientials = async()=>{
    await axios.post("/patient/check",{
      nid,
      ID: apid
    }).then(async(response)=>{
      console.log(response)
      if(response.data.success){
        await handleOTP()
        setOpen(true);
    setrs(true);
      }else{
        toast.error(`${response.data.error}`);
        //alert(response.data.error);

      }
    }).catch(function (error) {
      console.log(error);
      // toast.error(error.response.data.error);
    });
  }

  const submitHandler = async (e) => {
    e.preventDefault();
    //to do nid && ap id check
    await checkCredientials()
  
    
  };
  const handleConfirmation = async () => {
    console.log(email, otp);
    
    let status;
    await axios
      .post("/otp/verify", { email, otp })
      .then(function (response) {
        console.log(response);
        status = response.status;
      })
      .catch(function (error) {
        console.log(error);
        toast.error(error.response.data.error);
      });

    if (status === 200) {
      setVerified(true);
      setOpen(false);
    }
    setOtp("");
    setrs(false);
  };

  const renderTime = ({ remainingTime }) => {
    if (remainingTime === 0) {
      setrs(false);
      return <div className="timer">Too late...</div>;
    }

    return (
      <div className="timer">
        <div className="value">{remainingTime}</div>
        <div className="text">seconds</div>
      </div>
    );
  };

  return (
    <>
    <div>
      <br />
      <br />
      {!verified && (
        <FormContainer>
          <h1>Reschedule Appointment</h1>
          <br />
          {/* {message && <Message variant="danger">{message}</Message>} */}
          <Form onSubmit={submitHandler}>
            <Form.Group controlId="NID">
              <Form.Label>NID</Form.Label>
              <Form.Control
                type="NID"
                placeholder="Enter your NID"
                value={nid}
                onChange={(e) => setNid(e.target.value)}
                style={{ marginTop: "-20px" }}
                required
              ></Form.Control>
            </Form.Group>
            <Form.Group controlId="appointmentID">
              <Form.Label style={{ marginTop: "15px" }}>Appointment</Form.Label>
              <Form.Control
                type="id"
                placeholder="Enter your appointment id"
                value={apid}
                onChange={(e) => setApid(e.target.value)}
                style={{ marginTop: "-20px" }}
                required
              />
            </Form.Group>
            <Form.Group controlId="email">
              <Form.Label style={{ marginTop: "15px" }}>Email</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter your mail"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                style={{ marginTop: "-20px" }}
                required
              />
            </Form.Group>
            <Button
              type="submit"
              variant="primary"
              style={{
                height: "50px",
                marginTop: "20px",
                marginLeft: "40%",
              }}
            >
              Proceed
            </Button>
          </Form>
        </FormContainer>
      )}

      {verified && (
        <div>
          <Reschedule apid={apid} />
        </div>
      )}


      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Registration</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Otp is send to your email. Enter the otp here to procced further.
          </DialogContentText>
          <div
            style={{
              marginTop: "20px",
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <TextField
              autoFocus
              margin="dense"
              id="name"
              label=" Enter OTP"
              type="email"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              variant="outlined"
              sx={{
                width: "20ch",
                marginTop: "10%",
              }}
              spacing={2}
            />
            <CountdownCircleTimer
              key={key}
              isPlaying
              duration={180}
              colors={["#004777", "#F7B801", "#A30000", "#A30000"]}
              colorsTime={[30, 20, 10, 0]}
              // colors={[["#004775", 0.33], ["#F7B801", 0.33], ["#A30000"]]}
              size={120}
            >
              {renderTime}
            </CountdownCircleTimer>
          </div>
        </DialogContent>
        {console.log(rs, open)}

        <DialogActions
          style={{ display: "flex", justifyContent: "space-around" }}
        >
          <Button disabled={rs} onClick={handleResend}>
            Resend
          </Button>
          <Button onClick={handleConfirmation}>Confirm</Button>
        </DialogActions>
      </Dialog>
    </div>
    </>
  );
}

export default RescheduleScreen;
