import React, { useState, useEffect } from "react";
import TextField from "@mui/material/TextField";

import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";

import MenuItem from "@mui/material/MenuItem";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { IoIosAddCircle } from "react-icons/io";
import { Autocomplete } from "@mui/material";
import axios from "axios";
 
function MedicineAdd({ addMedicine }) {
  const [medName, setMedName] = useState("");
  const [medType, setMedType] = useState("Tablet");
  const [duration, setDuration] = useState("");
  const [dailyDose, setDailyDose] = useState("");
  const [comment, setComment] = useState("");
  const [medicines, setMedicines] = useState([]);

  const handleChangeMedName = (event, value) => {
    console.log(event, value);
    setMedName(value);
  };

  const handleChangeMedType = (event) => {
    setMedType(event.target.value);
  };
  const handleChangeDailyDose = (event) => {
    setDailyDose(event.target.value);
  };
  const handleChangeDuration = (event) => {
    setDuration(event.target.value);
  };

  const handleChangeComment = (event) => {
    setComment(event.target.value);
  };
  const fetchMedList = async () => {
    const response = await axios.get(`/medicine/view`);

    const medList = [];
    response.data.map((item) => {
      medList.push(item.medName);
    });
    setMedicines(medList);
  };
  useEffect(() => {
    fetchMedList();
  }, []);
  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <div>
        <div
          className="add-med"
          style={{ display: "flex", alignContent: "center" }}
        >
          <Autocomplete
            id="combo-box-demo"
            freeSolo
            options={medicines}
            sx={{ width: 300 }}
            value={medName}
            onChange={handleChangeMedName}
            ListboxProps={{ style: { maxHeight: "10rem" } }}
            renderInput={(params) => (
              <TextField variant="standard" {...params} label="Medicines" />
            )}
          />

          <Select
            labelId="medicine-type"
            id="medicine-type"
            value={medType}
            label="Medicine Type"
            onChange={handleChangeMedType}
            size="small"
            style={{ height: "50px", width: "130px" }}
          >
            <MenuItem value={"Tablet"}>Tablet</MenuItem>
            <MenuItem value={"Capsul"}>Capsul</MenuItem>
            <MenuItem value={"Syrup"}>Syrup</MenuItem>
            <MenuItem value={"Injection"}>Injection</MenuItem>
          </Select>

          <div
            style={{
              marginLeft: "100px",
              display: "flex",
              justifyContent: "space-evenly",
              justifyItems: "center",
            }}
          >
            <Button
              onClick={() => {
                console.log(medName);
                const newMed = {};
                newMed.name = medName;
                newMed.medType = medType;
                newMed.duration = duration;
                newMed.time = dailyDose;
                newMed.comment = comment;
                addMedicine(newMed);
                setMedName("");
                setMedType("Tablet");
                setDuration("");
                setDailyDose("");
                setComment("");
                console.log(newMed);
              }}
              sx={{
                ":hover": {
                  bgcolor: "white",
                },
              }}
            >
              <IoIosAddCircle color="green" style={{ fontSize: "40px" }} />
            </Button>
          </div>
        </div>

        <div>
          <TextField
            id="standard-basic"
            label="Daily Dose"
            variant="standard"
            value={dailyDose}
            required
            onChange={handleChangeDailyDose}
          />
          <TextField
            id="standard-basic"
            label="Duration"
            variant="standard"
            value={duration}
            required
            onChange={handleChangeDuration}
            style={{ marginLeft: "40px" }}
          />
          <TextField
            id="standard-basic"
            label="Instruction"
            variant="standard"
            value={comment}
            required
            onChange={handleChangeComment}
            // style={{ marginLeft: "40px" }}
          />
        </div>
      </div>
    </div>
  );
}

export default MedicineAdd;
