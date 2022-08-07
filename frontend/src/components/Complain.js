import React from "react";

import TextField from "@mui/material/TextField";
function Complain({ complains, handleComplain, inModal }) {
  // console.log(advise)
  return (
    <div>
      <ul>
        {complains.map((comp, index)=>{
          return (
            <li key = {index}>{comp}</li>
          )
        })}
      </ul>
      {/* <TextField
        id="outlined-multiline-static"
        minRows={2}
        multiline
        maxRows={5}
        // onChange={handleComplain}
        value={complains}
        disabled={inModal}
        variant={inModal ? "standard" : "outlined"}
        sx={{
          "& .MuiInputBase-input.Mui-disabled": {
            WebkitTextFillColor: "black",
          },
        }}
      /> */}
    </div>
  );
}

export default Complain;
