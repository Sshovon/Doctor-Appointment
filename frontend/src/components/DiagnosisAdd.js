import React, { useState } from "react";
import Button from "@mui/material/Button";
import { IoIosAddCircle } from "react-icons/io";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import Divider from "@mui/material/Divider";

function DiagnosisAdd({addDiagnosis}) {
  const [test, setTest] = useState("");
  const handleChangeTestType = (event) => {
    setTest(event.target.value);
  };
  return (
    <div>
      <h4>Diagnostic Tests</h4>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <h6>Select Tests</h6>
        <Select
          labelId="test-type"
          id="test-type"
          value={test}
          label="Diagnostic Test Type"
          onChange={handleChangeTestType}
        >
          <MenuItem value={"Biopsy"}>Biopsy</MenuItem>
          <MenuItem value={"CT Scan"}>CT Scan</MenuItem>
          <MenuItem value={"Blood Test"}>Blood Test</MenuItem>
        </Select>
        <Button style={{marginRight:"50px"}} color="success" onClick={()=>{
          addDiagnosis(test)
          setTest("")
        }}>
          <IoIosAddCircle style={{ fontSize: "35px" }} />
        </Button>
      </div>

      <Divider style={{ width: "80%" ,margin:"10px"}} />
    </div>
  );
}

export default DiagnosisAdd;
