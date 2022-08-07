import React, { useState, useEffect } from "react";
import { FaCapsules } from "react-icons/fa";
import { TbMedicineSyrup } from "react-icons/tb";
import { FaTablets } from "react-icons/fa";
import Divider from "@mui/material/Divider";
import { MdDeleteForever } from "react-icons/md";
import { Button, TextField } from "@mui/material";
import { GiSyringe } from "react-icons/gi";

function MedicineView({ medicines, deleteMedicineFromPrescription, inModal }) {
  console.log(medicines)
  return (
    <>
      <span style={{ fontSize: "2.5em" }}>
        R<sub>x</sub>
      </span>

      <br />
      <br />

      {medicines.map((medicine, index) => {
        return (
          <>
            <div key={index}>
              <div>
                <table>
                  <body></body>
                </table>
                {medicine.medType === "Syrup" ? (
                  <TbMedicineSyrup
                    style={{
                      color: "green",
                      fontSize: "25px",
                      justifyContent: "center",
                      marginRight: "10px",
                    }}
                  />
                ) : medicine.medType === "Tablet" ? (
                  <FaTablets
                    style={{
                      color: "green",
                      fontSize: "25px",
                      justifyContent: "center",
                      marginRight: "10px",
                    }}
                  />
                ) : medicine.medType === "Capsul" ? (
                  <FaCapsules
                    style={{
                      color: "green",
                      fontSize: "25px",
                      justifyContent: "center",
                      marginRight: "10px",
                    }}
                  />
                ) : (
                  <GiSyringe
                    style={{
                      color: "green",
                      fontSize: "25px",
                      justifyContent: "center",
                      marginRight: "10px",
                    }}
                  />
                )}
                <ins style={{ fontSize: "150%" }}>
                  <span> {medicine.name}</span>
                </ins>
              </div>
              <div
                style={{
                  display: "flex",
                  justifyContent: `${inModal ? "space-around": "space-between" }`,
                  fontSize: "120%",
                  paddingLeft: "50px",
                }}
              >
                <p>{medicine.time}</p>
                <p>{medicine.duration}</p>
                <p>{medicine.comment}</p>
                {!inModal && (
                  <Button
                    style={{ marginTop: "-35px", paddingRight: "100px" }}
                    onClick={() => {
                      deleteMedicineFromPrescription(index);
                    }}
                    sx={{
                      ":hover": {
                        bgcolor: "white",
                      },
                    }}
                  >
                    <MdDeleteForever
                      style={{
                        color: "grey",
                        fontSize: "25px",
                        marginRight: "10px",
                      }}
                    />
                  </Button>
                )}
              </div>
              {index < medicines.length - 1 && (
                <Divider style={{ width: "80%" }} />
              )}
            </div>
          </>
        );
      })}
    </>
  );
}

export default MedicineView;
