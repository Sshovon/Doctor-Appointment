import React from "react";
import { FaHandHoldingMedical } from "react-icons/fa";
import { Button } from "@mui/material";
import { MdDeleteForever } from "react-icons/md";

function DiagnosisView({ diagnosisList, deleteDiagnosis, inModal }) {
  
  return (
    <>
      {diagnosisList.map((element, index) => {
        return (
          <div
            key={index}
            style={{
              display: "flex",
              justifyContent: "flex-start",
              alignItems: "center",
              gap: "",
            }}
          >
            <div style={{ display: "flex", alignItems: "center" ,flex:"2"}}>
              <FaHandHoldingMedical
                style={{
                  color: "green",
                  fontSize: "20px",
                  justifyContent: "center",
                  marginRight: "10px",
                  
                }}
              />
              <h6>{element}</h6>
            </div>
            {inModal && <div></div>}
            {!inModal &&
            <div style={{ flex: "1" }}>
              
              <Button
                onClick={() => {
                    deleteDiagnosis(index);
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
      
            </div>
      }
          </div>
        );
      })}
    </>
  );
}

export default DiagnosisView;
