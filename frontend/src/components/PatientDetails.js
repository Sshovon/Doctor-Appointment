import React, { useEffect, useState } from "react";
import axios from "axios";

function PatientDetails() {
  const id = window.localStorage.getItem("id");
  const [patient, setPatient] = useState(null);
  const getDetails = async () => {
    await axios
      .get(`/appointment/view?ID=${id}`)
      .then(function (response) {
        setPatient(response.data[0]);
        console.log(response.data[0])
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  useEffect(() => {
    getDetails();
  }, []);
  return (
    <>
      {patient && (
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            fontSize: "130%",
          }}
        >
          <p> Name: {patient.patient[0].name} </p>

          <p style={{ marginLeft: "25px" }}> Age: {patient.patient[0].age} years</p>
          <p style={{ marginLeft: "25px" }}> AppointmentID: #{patient.ID}</p>
          <p style={{ marginLeft: "25px" }}> Email: {patient.patient[0].email} </p>
          <p style={{ marginLeft: "25px" }}>
            {" "}
            Date:{" "}
            {patient.visited
              ? patient.schedule.split(" ")[0].replaceAll("-", "/")
              : new Date().toLocaleDateString()}{" "}
          </p>
        </div>
      )}
    </>
  );
}

export default PatientDetails;
