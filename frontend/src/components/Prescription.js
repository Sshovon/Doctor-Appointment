import React, { useRef } from "react";
import { useReactToPrint } from "react-to-print";
import PrescriptionTable from "./PrescriptionTable";
// import { Box } from "@mui/system";

function Prescription() {
  const componentRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  return (
    <div className="wrapper">
      {
      (window.localStorage.getItem("userEmail")) && 
      <div className="prescription_form">
        <PrescriptionTable ref={componentRef} handlePrint={handlePrint} />
       
      </div>
}
    </div>
      
  );
}

export default Prescription;
