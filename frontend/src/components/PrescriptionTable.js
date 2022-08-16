import React, { useState, useEffect } from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import {Modal, Box, TextField, autocompleteClasses } from "@mui/material";
import Button from "@mui/material/Button";


import Logo from "./Logo"; 
import Address from "./Address";
import DiagnosisAdd from "./DiagnosisAdd";
import MedicineAdd from "./MedicineAdd";
import Advise from "./Advise";
import MedicineView from "./MedicineView";
import Divider from "@mui/material/Divider";
import DiagnosisView from "./DiagnosisView";
import PatientDetails from "./PatientDetails";
import NextVisitSignature from "./NextVisitSignature";

import axios from "axios";
import Complain from "./Complain";
import OnExamination from "./OnExamination";
import ComplainAdd from "./ComplainAdd";
import AdviseAdd from "./AdviseAdd";
import OEAdd from "./OEAdd";
import { useNavigate } from "react-router-dom";

const PrescriptionTable = React.forwardRef((props, ref) => {
  const medicines = [];
  const diagnosisList = [];
  const [prescribedMedicine, setPrescribedMedicine] = useState(medicines);
  const [prescribedDiagnosis, setPrescribedDiagnosis] = useState(diagnosisList);
  const [advise, setAdvise] = useState([]);
  const [oE, setOE] = useState([]);
  const [complains, setComplains] = useState([]);
  const [nextVisit, setNextVisit] = useState("");

  const navigate = useNavigate()

  const addMedicine = (newMed) => {
    setPrescribedMedicine((prevState) => {
      return [...prevState,newMed];
    });
  };
  const deleteMedicineFromPrescription = (id) => {
    const newMedList = prescribedMedicine.filter((med, index) => id !== index);
    setPrescribedMedicine(newMedList);
  };

  const deleteDiagnosis = (id) => {
    const newMedList = prescribedDiagnosis.filter(
      (diagnosis, index) => id !== index
    );
    setPrescribedDiagnosis(newMedList);
  };
  const addDiagnosis = (newDiagnosis) => {
    setPrescribedDiagnosis((prevState) => {
      return [ ...prevState, newDiagnosis];
    });
  };

  const createPrescription = async () => {
    const req = {
      doctorAdvise: advise,
      appointmentID: window.localStorage.getItem("id"),
      drugs: prescribedMedicine,
      tests: prescribedDiagnosis.toString(),
      oe:oE,
      complain:complains,
      nextVisit
    };
    //console.log(req);
    await axios
      .post("/prescription/create", req)
      .then(function (response) {
        console.log(response.data);
        // setPatient(response.data[0])
        // console.log(response.status)
      })
      .catch(function (error) {
        console.log(error);
      });
    
    const meds=[];
    req.drugs.map((item)=>{
      const newMed={}
      newMed.medName=item.name;
      newMed.medType=item.medType;
      meds.push(newMed)
    })
    await axios.post(`/medicine/add`,meds);

    handleOpen();
  };

  const handleAdvise = (newAdvice) => {
    setAdvise((prevState)=>{
      return [...prevState,newAdvice]
    })
  };
  const handleComplain = (newComplain) => {
    setComplains((prevState) => {
      return [ ...prevState,newComplain];
    });
  };
  const handleOE = (newOE) => {
    setOE((prevState)=>{
      return [...prevState, newOE]
    });
  };
  const handleNextVisit = (date) => {
    const d=date.toLocaleDateString
    setNextVisit(date);
  };

  // const [inModal, setInModal] = useState(false)

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    navigate('/')
  }
  const boxStyle = {
    position: "relative",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "90%",
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
    overflow: "scroll",
    height: "100%",
  };

  const prescriptionStyle = {
    margin: 'auto',
    width: '75%'
  }

  return (
    <div style={prescriptionStyle}>
      <TableContainer component={Paper} style={{ width: "100%" }}>
        <Table aria-label="spanning table">
          <TableHead>
            <TableRow>
              <TableCell align="left">
                <Logo />
              </TableCell>
              <TableCell align="right" colSpan={2}>
                <Address />
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <TableCell colSpan={3}>
                <PatientDetails/>      
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell style={{width:"500px"}}>
              <h6>Complain</h6>
              <ComplainAdd handleComplain = {handleComplain} />
                <br />
                <Complain
                  handleComplain={handleComplain}
                  complains={complains}
                  inModal={open}
                />
                <br />
                <h6>O/E</h6> 
                <OEAdd handleOE={handleOE}/>
                <br />
                <OnExamination handleOE={handleOE} oE={oE} inModal={open} />
                <br />
                <h6>Advice</h6>
                <AdviseAdd handleAdvise={handleAdvise}/>
                <br />
                <Advise
                  handleAdvise={handleAdvise}
                  advise={advise}
                  inModal={open}
                />
                <br />
                {!open && <DiagnosisAdd addDiagnosis={addDiagnosis} />}
                <br />
                <DiagnosisView
                  diagnosisList={prescribedDiagnosis}
                  deleteDiagnosis={deleteDiagnosis}
                  inModal={open}
                />
              </TableCell>

              <TableCell style={{ verticalAlign: "top" }}>
                <MedicineAdd addMedicine={addMedicine} />
                <br />
                <Divider style={{ width: "100%" }} />
                <MedicineView
                  medicines={prescribedMedicine}
                  deleteMedicineFromPrescription={
                    deleteMedicineFromPrescription
                  }
                  inModal={open}
                />
                <br />
                <br />
                <Divider style={{ width: "100%" }} />
                <br />
                <br />
                <NextVisitSignature nextVisit={nextVisit} handleNextVisit={handleNextVisit}/>
              </TableCell>
              <TableCell style={{width:"200px"}} />
            </TableRow >

            <TableRow>

              <TableCell align="center" colSpan={2}>
                <Button
                  variant="contained"
                  size="large"
                  style={{ height: "50px" }}
                  onClick={createPrescription}
                >
                  <i className="fas fa-file-prescription"> Prescribe</i>
                </Button>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>

      {/* here */}

      
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        // disableScrollLock= {open}
      >
        <Box sx={boxStyle}>
          <TableContainer
            component={Paper}
            ref={ref}
            style={{ width: "100%", height: "95%" }}
          >
            <Table aria-label="spanning table">
              <TableHead>
                <TableRow>
                  <TableCell align="left">
                    <Logo />
                  </TableCell>

                  <TableCell align="right" colspan={2}>
                    <Address />
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow>
              <TableCell colSpan={3}>
                <PatientDetails/>
              </TableCell>
            </TableRow>
                <TableRow>
                  <TableCell>
                    <h6>Complain</h6>
                    
                    <Complain
                      handleComplain={handleComplain}
                      complains={complains}
                      inModal={open}
                    />
                    <br />
                    <h6>O/E</h6>
                    
                    <OnExamination handleOE={handleOE} oE={oE} inModal={open} />
                    <br />
                    <h6>Advice</h6>
                    
                    <Advise
                      handleAdvise={handleAdvise}
                      advise={advise}
                      inModal={open}
                    />
                    <br />
                    {!open && <DiagnosisAdd addDiagnosis={addDiagnosis} />}
                    <br />
                    <h5>Diagnostic Tests</h5>
                    <DiagnosisView
                      diagnosisList={prescribedDiagnosis}
                      deleteDiagnosis={deleteDiagnosis}
                      inModal={open}
                    />
                  </TableCell>

                  <TableCell style={{ verticalAlign: "top" }}>
                    <MedicineView
                      medicines={prescribedMedicine}
                      deleteMedicineFromPrescription={
                        deleteMedicineFromPrescription
                      }
                      inModal={open}
                    />
                    <br />
                    <br />
                    <Divider style={{ width: "100%" }} />
                    <br />
                    <br />
                    <NextVisitSignature nextVisit={nextVisit} handleNextVisit={handleNextVisit} inModal={open}/>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
          
          <Button
            onClick={props.handlePrint}
            variant="contained"
            size="large"
            style={{ height: "50px", marginLeft:'500px' }}
          >
            <i className="fas fa-print"> Print</i>
          </Button>
          
        </Box>
      </Modal>
    </div>
  );
});

export default PrescriptionTable;
