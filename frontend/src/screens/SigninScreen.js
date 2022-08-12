import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Form, Button } from "react-bootstrap";

// import Message from "../components/Message";
// import Loader from "../components/Loader";
import FormContainer from "../components/FormContainer";
// import { ToastContainer, toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css"; 

import axios from "axios";
import toast, { Toaster } from "react-hot-toast";

import "react-datepicker/dist/react-datepicker.css";

function SigninScreen({isAuth}) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // const [isAuth, setIsAuth] = useState(isAuth)
  // const [message, setMessage] = useState(null);
  // const [response, setResponse] = useState(null);


  
  const navigate= useNavigate()
  

  const checkCredential = async () => {
    try {
      const loadingToast=toast.loading("Checking credential");
      const { data, status } = await axios.post("/doctor/signin", {
        email,
        password,
      });
      toast.dismiss(loadingToast);
      console.log(data, status, email);
      data.error && toast.error("Invalid Credentials");
      !data.error && toast.success("Signin Successful!") && navigate('/dashboard')
      window.localStorage.setItem('userEmail', email)
      window.localStorage.setItem('reload',true)
    } catch (e) {
      console.log(e);
    }
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    await checkCredential();
  };

  return (
    <div>
      <Toaster />
      <br />
      <br />
      <FormContainer>
        <h1>Doctor's Credentials</h1>
        <br />
        <Form onSubmit={submitHandler}>
          <Form.Group controlId="email">
            <Form.Label>Email</Form.Label>
            <Form.Control
              required
              type="email"
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={{ marginTop: "-20px" }}
            />
          </Form.Group>
          <Form.Group controlId="password">
            <Form.Label style={{ marginTop: "15px" }}>Password</Form.Label>
            <Form.Control
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={{ marginTop: "-20px" }}
            />
          </Form.Group>
          <div style={{ marginTop: "20px",display: "flex", justifyContent: "space-between" }}>
          <Button
            type="submit"
            variant="primary"
            style={{
              height: "50px",
              left:"5%"
            }}
            
          >
            Sign in
          </Button>
          {/* <Link to="/patientLogin" style={{
                  width: "150px",
                  marginTop: "30px",
                  marginRight: "25px",
                  color: "black",
                  // textDecoration:"none"
                }}>
              <p>Register as patient</p>
          </Link> */}
          </div>
          
        </Form>
      </FormContainer>
    </div>
  );
}

export default SigninScreen;
