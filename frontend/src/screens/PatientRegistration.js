import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Form, Button } from "react-bootstrap";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Box,
  FormControl,
  InputLabel,
  OutlinedInput,
  InputAdornment,
  Select,
  MenuItem,
} from "@mui/material"; 

import { CountdownCircleTimer } from "react-countdown-circle-timer";
import FormContainer from "../components/FormContainer";

import axios from "axios";
import toast, { Toaster } from "react-hot-toast";

import { TextField } from "@mui/material";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

function PatientRegistration() {
  const [nid, setNid] = useState("");
  const [name, setName] = useState("");
  const [fName, setFname] = useState("");
  const [mName, setMname] = useState("");
  const [dob, setDOB] = useState(new Date());
  const [gender, setGender] = useState("");
  const [mobile, setMobile] = useState("");
  const [cAddress, setCaddress] = useState("");
  const [pAddress, setPaddress] = useState("");
  const [email, setEmail] = useState("");
  const [open, setOpen] = React.useState(false);
  const [otp, setOtp] = useState("");
  const [rs, setrs] = useState(true);
  const [key, setKey] = useState(0);

  const [value, setValue] = useState(new Date());

  const navigate = useNavigate();

  const renderTime = ({ remainingTime }) => {
    if (remainingTime === 0) {
      setrs(false);
      return <div className="timer">Too lale...</div>;
    }

    return (
      <div className="timer">
        <div className="value">{remainingTime}</div>
        <div className="text">seconds</div>
      </div>
    );
  };

  const handleClose = () => {
    setOpen(false);
    setOtp("");
  };

  const handleResend = async () => {
    setKey((pk) => pk + 1);
    setrs(true);
    await handleOTP();
  };

  const patientRegister = async () => {
    await axios
      .post("/patient/register", {
        name,
        fatherName: fName,
        motherName: mName,
        email,
        nid,
        gender,
        mobile,
        dob,
      })
      .then((response) => {
        if (response.data.error) toast.error(`${response.data.error}`);
        else {
          toast.success("Registration successful");
          navigate("/appointment");
        }
      })
      .catch((error) => {
        console.log(error);
        toast.error(`${error.response.data.error}`);
      });
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
        toast.error(`${error.response.data.error}`);
      });

    if (status === 200) await patientRegister();
    setOtp("");
    setrs(false);
  };

  const handleOTP = async () => {
    const response = await axios.post("/otp/send", { email });
    console.log(response);
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    console.log("need to handle otp");
    await handleOTP();
    setOpen(true);
    setrs(true);
  };

  return (
    <div>
      <br />
      <br />
      <FormContainer>
        <h1>Patient Registration</h1>
        <br />
        <Form onSubmit={submitHandler}>
          <Form.Group controlId="name">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="name"
              placeholder="Enter your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              style={{ marginTop: "-20px" }}
            ></Form.Control>
          </Form.Group>

          <Form.Group controlId="fname">
            <Form.Label style={{ marginTop: "15px" }}>Father's Name</Form.Label>
            <Form.Control
              type="fname"
              placeholder="Enter your father's name"
              value={fName}
              onChange={(e) => setFname(e.target.value)}
              style={{ marginTop: "-20px" }}
            ></Form.Control>
          </Form.Group>

          <Form.Group controlId="fname">
            <Form.Label style={{ marginTop: "15px" }}>Mother's Name</Form.Label>
            <Form.Control
              type="mname"
              placeholder="Enter your mother's name"
              value={mName}
              onChange={(e) => setMname(e.target.value)}
              style={{ marginTop: "-20px" }}
            ></Form.Control>
          </Form.Group>

          <Form.Group controlId="gender">
            <Form.Label style={{ marginTop: "15px" }}>Gender</Form.Label>
            <Form.Select
              aria-label="Default select example"
              value={gender}
              onChange={(e) => {
                setGender(e.target.value);
              }}
              
            >
              <option>Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </Form.Select>
          </Form.Group>

          <Form.Group controlId="dob">
            <Form.Label style={{ marginTop: "15px" }}>
              Date of Birth{" "}
            </Form.Label>
            <br></br>
            <input
              type="date"
              id="dob"
              name="dob"
              value={dob}
              onChange={(e) => setDOB(e.target.value)}
            ></input>
          </Form.Group>

          <Form.Group controlId="mobile">
            <Form.Label style={{ marginTop: "15px" }}>Mobile</Form.Label>
            <Form.Control
              type="mobile"
              placeholder="Enter your mobile number"
              value={mobile}
              onChange={(e) => setMobile(e.target.value)}
              style={{ marginTop: "-20px" }}
            ></Form.Control>
          </Form.Group>

          <Form.Group controlId="nid">
            <Form.Label style={{ marginTop: "15px" }}>NID</Form.Label>
            <Form.Control
              type="number"
              placeholder="Enter your NID number"
              value={nid}
              onChange={(e) => setNid(e.target.value)}
              style={{ marginTop: "-20px" }}
            ></Form.Control>
          </Form.Group>

          <Form.Group controlId="email">
            <Form.Label style={{ marginTop: "15px" }}>Email</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={{ marginTop: "-20px" }}
            ></Form.Control>
          </Form.Group>

          <Form.Group controlId="caddress">
            <Form.Label style={{ marginTop: "15px" }}>
              Present Address
            </Form.Label>
            <Form.Control
              type="caddress"
              placeholder="Enter your present address"
              value={cAddress}
              onChange={(e) => setCaddress(e.target.value)}
              style={{ marginTop: "-20px" }}
            ></Form.Control>
          </Form.Group>

          <Form.Group controlId="paddress">
            <Form.Label style={{ marginTop: "15px" }}>
              Permanent Address
            </Form.Label>
            <Form.Control
              type="paddress"
              placeholder="Enter your permanent address"
              value={pAddress}
              onChange={(e) => setPaddress(e.target.value)}
              style={{ marginTop: "-20px" }}
            ></Form.Control>
          </Form.Group>

          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <Button
              type="submit"
              variant="success"
              style={{
                marginTop: "20px",
                marginBottom: "20px",
                height: "50px",
              }}
            >
              Register
            </Button>
          </div>
        </Form>
      </FormContainer>

      {/* ----------------------<<<<<<<<<<<<<< Otp modal >>>>>>>>>>>>>>>---------------------       */}

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Registration</DialogTitle>
        <DialogContent>
          <DialogContentText>
            To complete registration verify OTP sent to your mail
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
              duration={120}
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
  );
}

export default PatientRegistration;
