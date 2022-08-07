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
import toast, { Toaster } from "react-hot-toast";

import "react-datepicker/dist/react-datepicker.css";

const Reschedule = ({ apid }) => {  
  const [nid, setNid] = useState("");
//   const [rs, setRs] = useState(false);
  const [id, setID] = useState(apid);
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

  const handleReschedule = async () => {

    await axios
      .get(`/appointment/reschedule/${id}`)
      .then(function (response) {
        console.log(response);
        if(response.data.success) {
          toast.success("Rescheduled successfully");
        }
        else
          toast.error("Rescheduling failed");
       
      }).then(()=>handleCreate())
      .catch(function (error) {
        console.log(error);
        toast.error(error)
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
        simulateFetch(data)
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    handleReschedule()
  };

  
  const getDetails = async () => {
    console.log(id) 
    await axios
      .get(`/appointment/view?ID=${id}`)
      .then(function (response) {
        const data = response.data[0]; 
        console.log(response);
        setNid(data.nid);
        // console.log(data.description)
        setDescription(data.description);
        setID(data.ID)
        setSelectedDate(
          new Date(data.schedule.split(" ")[0].replaceAll("-", "/"))
        );
        setSchedule(data.schedule.split(" ")[1]);
        handleDateSelect(
          new Date(data.schedule.split(" ")[0].replaceAll("-", "/"))
        );
      })
      .catch(function (error) {
        console.log(error);
      });
  };



    useEffect(() => {
        getDetails()
      
    }, [])
    

  return (
    <div>
      <Toaster />
      <br />
      <br />
      {description.length !== 0 &&
      <FormContainer>
        <h1>Patient's Information</h1>
        <br />
        {/* {message && <Message variant="danger">{message}</Message>} */}
        <Form onSubmit={submitHandler}>
          <Form.Group controlId="NID">
            <Form.Label>NID</Form.Label>
            <Form.Control
              disabled
              type="NID"
              placeholder="Enter your NID"
              value={nid}
              onChange={(e) => setNid(e.target.value)}
            ></Form.Control>
          </Form.Group>
          <Form.Group controlId="description">
            <Form.Label>Description</Form.Label>
            <Form.Control
              disabled
              type="description"
              placeholder="Describe your disease in a few word"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            ></Form.Control>
          </Form.Group>

          <Row>
            <Col md={4}>
              <Form.Group controlId="date">
                <Form.Label>Pick a Date</Form.Label>
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
}
    </div>
  );
};

export default Reschedule;
