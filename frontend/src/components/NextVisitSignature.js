import { TextField } from '@mui/material'
import React from 'react'

function NextVisitSignature({nextVisit,handleNextVisit, inModal}) {
  const fontColor = {
    style: { color: 'rgb(50, 50, 50)' }
    }
    return (
        <div>
            <div
                  style={{ display: "flex", justifyContent: "space-between" }}
                >
                  <TextField
                    id="standard-basic"
                    label="Next Visit"
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
                    <p style={{ marginLeft: "40px", marginTop: "-15px" }}>
                      Signature
                    </p>
                  </div>
                </div>
        </div>
    )
}

export default NextVisitSignature
