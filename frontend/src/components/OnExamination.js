import React from "react";

import TextField from "@mui/material/TextField";
function OnExamination({ oE, handleOE, inModal}) {

  return (
    <div>
      <ul>
      {oE.map((oe, index)=>{
          return (
            <li key = {index}>{oe}</li>
          )
        })}
      </ul>
      
    </div>
  );
}

export default OnExamination;
