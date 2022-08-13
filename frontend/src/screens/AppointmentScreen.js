import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Form,
  Button,
  Row,
  Col,
  Dropdown,
  DropdownButton,
} from "react-bootstrap";

import Message from "../components/Message";
import Loader from "../components/Loader";
import FormContainer from "../components/FormContainer";
// import { ToastContainer, toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";

import axios from "axios";

import DatePicker from "react-datepicker";
import { addDays, getDay } from "date-fns";
import toast from "react-hot-toast";

import "react-datepicker/dist/react-datepicker.css";
import { useCallback } from "react";

const AppointmentScreen = () => {  
  const [nid, setNid] = useState("");
  // const [rs, setRs] = useState(false);
  const [id, setID] = useState("");
  const [description, setDescription] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const [schedules, setSchedules] = useState([]);
  const [schedule, setSchedule] = useState("");
  
  const navigate = useNavigate();
  const isWeekday = (date) => {
    const day = getDay(date);
    return day !== 0 && day !== 6;
  };
  const handleDateSelect = async (date) => {
    // console.log(date)
    setSelectedDate(date);

    console.log(date.toLocaleDateString().replaceAll("/", "-"));

    date = date.toLocaleDateString().replaceAll("/", "-");

    console.log(`/appointment/schedule/${date}`);
    await axios
      .get(`appointment/schedule/${date}`)
      .then(function (response) {
        console.log(response.data.schedules);
        setSchedules(response.data.schedules);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const simulateFetch = async (data) => {
    toast.promise(sendMail(data), {
      loading: "Sending mail",
      success: "sent mail successfully",
      error: "Error when sending mail",
    });
  };

  const sendMail = async (data) => {
    console.log("response sent to mail ",data);

    await axios
      .post("/mail/send", data)
      .then(function (res) {
        console.log(res);
        if (res.status === 200) {
          navigate('/') 
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  };


  const handleCreate = async () => {
    console.log(description, schedule)
    await axios
      .post("/appointment/create", {
        nid,
        description,
        schedule: `${selectedDate
          .toLocaleDateString()
          .replaceAll("/", "-")} ${schedule}`,
      })
      .then(function (response) {
        console.log(` response from creation `);
        console.log(response)
        if (response.status === 200) {
            // console.log(response.data)
            return response.data
        };
      }).then((data)=> {
        console.log(data)
        if(data.error){
          toast.error("Patient is not registered!")
        }
        else
          simulateFetch(data)
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
   
      console.log(`creating `)
      handleCreate()
    
  };

 

  return (
    <div>
      <br />
      <br />
      <FormContainer>
        <h1>Appointment</h1>
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
            ></Form.Control>
          </Form.Group>
          <Form.Group controlId="description">
            <Form.Label style={{ marginTop: "15px" }}>Description</Form.Label>
            <Form.Control
              type="description"
              placeholder="Describe your disease in a few word"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              style={{ marginTop: "-20px" }}
            ></Form.Control>
          </Form.Group>

          <Row style={{ marginTop: "15px" }}>
            <Col md={4}>
              <Form.Group controlId="date">
                <Form.Label >Pick a Date</Form.Label>
                <DatePicker
                  selected={selectedDate}
                  onChange={(date) => handleDateSelect(date)}
                  minDate={new Date()}
                  maxDate={addDays(new Date(), 30)}
                  filterDate={isWeekday}
                />
              </Form.Group>
            </Col>
            <Col md={{ span: 4, offset: 4 }}>
              <Form.Group controlId="schedule" style={{marginTop:'20px'}}>
                {/* <Form.Label>Pick a Schedule</Form.Label> */}
                <Dropdown>
                  <Dropdown.Toggle variant="primary" id="dropdown-basic">
                    {schedule ? `${schedule} PM` : "schedule"}
                  </Dropdown.Toggle>

                  <Dropdown.Menu>
                    {schedules &&
                      schedules.map(
                        (sch, key) =>
                          !sch.booked && (
                            <Dropdown.Item
                              key={key}
                              onClick={(e) => setSchedule(sch.time)}
                            >
                              {sch.time} PM
                            </Dropdown.Item>
                          )
                      )}
                  </Dropdown.Menu>
                </Dropdown>
              </Form.Group>
            </Col>
          </Row>

          <Button
            type="submit"
            variant="success"
            style={{
              marginTop: "20px",
              display: "flex",
              position: "relative",
              left: "45%",
              marginBottom: "20px",
            }}
          >
            Confirm
          </Button>
        </Form>
      </FormContainer>
  
    </div>
  );
};

export default AppointmentScreen;
