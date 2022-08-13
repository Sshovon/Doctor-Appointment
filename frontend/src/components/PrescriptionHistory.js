import React, { useState, useEffect } from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import {Modal, Box, TextField } from "@mui/material";
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

const PrescriptionHistory = React.forwardRef((props, ref) => {
  const medicines = [];
  const diagnosisList = [];
  const [prescribedMedicine, setPrescribedMedicine] = useState(medicines);
  const [prescribedDiagnosis, setPrescribedDiagnosis] = useState(diagnosisList);
  const [advise, setAdvise] = useState([]);
  const [oE, setOE] = useState([]);
  const [complain, setComplain] = useState([]);
  const [nextVisit, setNextVisit] = useState("");
  const [data,setData]=useState(null);
 

  const handleAdvise = (e) => {
    setAdvise(e.target.value);
  };
  const handleComplain = (e) => {
    setComplain(e.target.value);
  };
  const handleOE = (e) => {
    setOE(e.target.value);
  };
  const handleNextVisit = (e) => {
    setNextVisit(e.target.value);
  };

  const fetchPrescription= async()=>{
    const presData= await axios.get(`/prescription/view?id=${window.localStorage.getItem("id")}`)
    // presData.data.prescription.drugs.map((el)=>{
    //   el.medType=el.type
    // })
    console.log(presData)
    setData(presData.data)
    setComplain(presData.data.prescription.complain)
    setOE(presData.data.prescription.oe)
    setAdvise(presData.data.prescription.doctorAdvise)
    setPrescribedMedicine(presData.data.prescription.drugs)
    setPrescribedDiagnosis(presData.data.prescription.tests.split(','))
    setNextVisit(presData.data.prescription.nextVisit)
}

  const [open, setOpen] = React.useState(true);


  useEffect(()=>{
    window.localStorage.getItem("userEmail") && fetchPrescription()
    // console.log(presData)
  },[])

  const style = {
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

  return (
    <>
    {
          (window.localStorage.getItem("userEmail")) && 
    <div style={{margin:'auto', width: '80%'}}>   
    {data !== null &&
    <Box >
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
            <TableCell style={{width: '25%'}}>
              <div style={{marginLeft:'0px'}}> 

              
              <h5>Complain</h5>
              
              <Complain
                handleComplain={handleComplain}
                complains={complain}
                inModal={open}
              />
              <br />
              <h5>O/E</h5>
              
              <OnExamination handleOE={handleOE} oE={oE} inModal={open} />
              <br />
              <h5>Advice</h5>
              
              <Advise
                handleAdvise={handleAdvise}
                advise={advise}
                inModal={open}
              />
              <br />
      
              <br />
              <h5>Diagnostic Tests</h5>
              <DiagnosisView
                diagnosisList={prescribedDiagnosis}
                
                inModal={open}
              />
              </div>
            </TableCell>

            <TableCell style={{ verticalAlign: "top", width:'75%'}}>
              <div style={{marginLeft:'0px'}}>

              <MedicineView
                medicines={prescribedMedicine}
                
                inModal={open}
              />
              <br />
              <br />
              <Divider style={{ width: "100%" }} />
              <br />
              <br />
              <NextVisitSignature nextVisit={nextVisit} handleNextVisit={handleNextVisit} inModal={open}/>
                              
              </div>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
    
    
    
  </Box>
      //   <div style={{display:"flex",justifyContent:"center"}}>
      //   <TableContainer component={Paper} style={{ width: "80%" }}>
      //   <Table aria-label="spanning table">
      //     <TableHead>
      //       <TableRow>
      //         <TableCell align="left">
      //           <Logo />
      //         </TableCell>
      //         <TableCell align="right" colSpan={2}>
      //           <Address />
      //         </TableCell>
      //       </TableRow>
      //     </TableHead>
      //     <TableBody>
      //       <TableRow>
      //         <TableCell colSpan={3}>
      //           <PatientDetails/>
      //         </TableCell>
      //       </TableRow>
      //       <TableRow>
      //         <TableCell>
      //           <Complain
      //             handleComplain={handleComplain}
      //             complains={complain}
      //             inModal={open}
      //           />
      //           <br />
      //           <OnExamination handleOE={handleOE} oE={oE} inModal={open} />
      //           <br />
      //           <Advise
      //             handleAdvise={handleAdvise}
      //             advise={advise}
      //             inModal={open}
      //           />
      //           <br />
      //           <br />
      //           <DiagnosisView
      //             diagnosisList={prescribedDiagnosis}
                  
      //             inModal={open}
      //           />
      //         </TableCell>

      //         <TableCell style={{ verticalAlign: "top" }}>
      //           <MedicineView
      //             medicines={prescribedMedicine}
      //             inModal={open}
      //           />
      //           <br />
      //           <br />
      //           <Divider style={{ width: "100%" }} />
      //           <br />
      //           <br />
      //           <NextVisitSignature nextVisit={nextVisit} handleNextVisit={handleNextVisit} inModal={open}/>
      //         </TableCell>
      //       </TableRow>

            
      //     </TableBody>
      //   </Table>
      // </TableContainer>
      //   </div>
}
    </div>
}
    </>
  );
});

export default PrescriptionHistory;
