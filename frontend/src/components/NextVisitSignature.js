import React, { useState } from "react";
import DatePicker from "react-datepicker";
import { addDays, getDay } from "date-fns";
import "react-datepicker/dist/react-datepicker.css";
import { TextField } from "@mui/material";

const fontColor = {
  style: { color: "rgb(50, 50, 50)" },
};
function NextVisitSignature({ nextVisit, handleNextVisit, inModal }) {
  const [startDate, setStartDate] = useState(new Date());
  const isWeekday = (date) => {
    const day = getDay(date);
    return day !== 0 && day !== 6;
  };
  console.log(nextVisit)
  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between" }}>

        {!inModal &&
        <div style={{ marginTop: "18px" }}>
          <h6>Next visit</h6>{" "}
          <DatePicker
          className="nextVisit"
            selected={startDate}
            onChange={(date) => {
              setStartDate(date)
              handleNextVisit(date)
            }
            }
            disabled={inModal}
            minDate={new Date()}
                  maxDate={addDays(new Date(), 30)}
                  filterDate={isWeekday}
                  style={{color:'red'}}
          />
          {/* <br /> */}
        </div>}

        {inModal && 
        <div>
          <h6>Next visit</h6>
        <TextField
                    id="standard-basic"
                    variant="standard"
                    value={nextVisit}
                    onChange={handleNextVisit}
                    disabled={inModal}
                    inputProps={fontColor}
                    sx={{ 
                      "& .MuiInputBase-input.Mui-disabled": {
                        WebkitTextFillColor: "black",
                      },
                    }}
                  /> 
                  </div>
}
        <div>
          <p
            style={{
              borderBottom: "1px solid black",
              width: "150px",
              marginTop: "15px",
              marginRight: "25px",
            }}
          >
            <img
              style={{ width: "150px" }}
              src="https://see.fontimg.com/api/renderfont4/DOLnW/eyJyIjoiZnMiLCJoIjo2NSwidyI6MTAwMCwiZnMiOjY1LCJmZ2MiOiIjMDAwMDAwIiwiYmdjIjoiI0ZGRkZGRiIsInQiOjF9/RHIuIE1hc3Vt/autography.png"
              alt="signature"
            />
          </p>
          <p style={{ marginLeft: "40px", marginTop: "-15px" }}>Signature</p>
        </div>
      </div>
    </div>
  );
}

export default NextVisitSignature;
