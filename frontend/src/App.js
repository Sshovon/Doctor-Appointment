import {BrowserRouter, Route, Routes } from "react-router-dom";
import React, { useState, useEffect } from "react"; 

import Header from "./components/Header";
// import Footer from "./components/Footer";
import AppointmentScreen from './screens/AppointmentScreen'
import LandingScreen from "./screens/LandingScreen";
import SigninScreen from "./screens/SigninScreen";
import DoctorLandingScreen from "./screens/DoctorLandingScreen";
import PatientRegistration from "./screens/PatientRegistration";
import Prescription from "./components/Prescription";
import './App.css'
import PrescriptionHistory from "./components/PrescriptionHistory";
import RescheduleScreen from "./screens/RescheduleScreen";
import toast, { Toaster } from "react-hot-toast";

export default function App() {



  return (
    <>
  
    <BrowserRouter>
    <Header />
    <Toaster/>
      <Routes>
        <Route path="/" element={<LandingScreen/> } exact/>
        <Route path="/patientLogin" element={<PatientRegistration/>} />
        <Route path="/appointment" element={< AppointmentScreen />}/>
        <Route path="/signin" element={< SigninScreen/>}/>
        <Route path="/dashboard" element={< DoctorLandingScreen/>}/>
        <Route path="/prescribe" element={< Prescription/>}/>
        <Route path="/prescriptions" element={< PrescriptionHistory/>}/>
        <Route path="/reschedule" element={< RescheduleScreen />}/>
      </Routes>
    </BrowserRouter>
   
  </>
  );
}

