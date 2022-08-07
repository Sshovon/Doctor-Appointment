import React from "react";

import TextField from "@mui/material/TextField";
function Advise({handleAdvise,advise, inModal}) {
  // console.log(advise)
  return (
    <div>
      
      <ul>
      {advise.map((adv, index)=>{
          return (
            <li key = {index}>{adv}</li>
          )
        })}
      </ul>
      
    </div>
  );
}

export default Advise;
