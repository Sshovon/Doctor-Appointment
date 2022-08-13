import {
  InputLabel,
  OutlinedInput,
  FormControl,
  InputAdornment,
  IconButton,
  Grid,
  Box,
  Card,
  CardActionArea,
  CardContent,
  Typography,
  Paper,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";
import React, { useState } from "react";
import toast, { Toaster } from 'react-hot-toast';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

function SearchBar({ placeholder, data }) {
  const navigate = useNavigate();

  const [filteredData, setFilteredData] = useState([]);
  const [wordEntered, setWordEntered] = useState("");
  console.log(data);

  const handleFilter = (event) => {
    const searchWord = event.target.value;
    setWordEntered(searchWord);
    const newFilter = data.filter((value) => {
      console.log(value.patient[0].name)
      return value.patient[0].name.toLowerCase().includes(searchWord.toLowerCase());
    });

    if (searchWord === "") {
      setFilteredData([]);
    } else {
      setFilteredData(newFilter);
    }
  };

  const clearInput = () => {
    setFilteredData([]);
    setWordEntered("");
  };
  return (
    <>
      <div
        style={{
          position: "relative",
          marginLeft: "auto",
          marginRight: "30px",
          width: "60%",
        }}
      >
        <FormControl sx={{ m: 1, width: "100%" }} variant="outlined">
          <InputLabel htmlFor="outlined-adornment-search">Search</InputLabel>
          <OutlinedInput
            // id="outlined-adornment-password"
            type="test"
            placeholder={placeholder}
            value={wordEntered}
            onChange={handleFilter}
            endAdornment={
              <InputAdornment position="end">
                {filteredData.length === 0 ? (
                  <IconButton>
                    <i className="fas fa-search" style={{ color: "grey" }}></i>
                  </IconButton>
                ) : (
                  <IconButton>
                    <i
                      className="fas fa-search"
                      style={{ color: "blueviolet" }}
                    ></i>
                  </IconButton>
                )}
              </InputAdornment>
            }
            label="search"
          />
        </FormControl>
      </div>
      <Box sx={{ flexGrow: 1 }} style={{ margin: "25px" }}>
        <Grid container spacing={2}>
          {filteredData.length != 0 &&
            filteredData.slice(0, 10).map((el, key) => {
              return (
                <Grid item xs={2} key={key}>
                  <Item
                    // 0
                  >
                    <Card style={{ backgroundColor:'#e1f9fc'}}>
                      <CardActionArea
                        onClick={() => {
                          console.log(el)
                          if(el.expired){
                            toast.error("Appointment is expired!")
                          }
                          else if(el.visited){
                            window.localStorage.setItem("id", el.ID);
                            navigate("/prescriptions");
                          }else{
                            window.localStorage.setItem("id", el.ID);
                            navigate("/prescribe");
                          }
                        }}
                      >
                        <CardContent>
                          <Typography gutterBottom variant="h6" component="div">
                          {el.patient[0].name} 
                          </Typography>

                          <Typography
                            variant="button"
                            color="text.secondary"
                            component="div"
                          >
                            Date : {el.schedule.split(" ")[0]}
                          </Typography>
                          <Typography
                            variant="button"
                            color="text.secondary"
                            component="div"
                          >
                            Time : {el.schedule.split(" ")[1]} pm
                          </Typography>
                          {el.expired && (
                            <Typography
                              variant="button"
                              color="text.secondary"
                              component="div"
                            >
                              {/* <p style={{ color: "#FF0000" }}>Expired</p> */}
                              <i class="fas fa-ban" style={{color:"#FF0000"}}> Expired</i>
                            </Typography>
                          )}
                          {el.visited && !el.expired && (
                            <Typography
                              variant="button"
                              color="text.secondary"
                              component="div"
                            >
                              {/* <p style={{ color: "#00a700" }}>Prescribed</p> */}
                              <i class="fas fa-check-circle" style={{color:"#00a700"}}> Prescribed</i>
                            </Typography>
                          )}
                          {!el.visited && !el.expired && (
                            <Typography
                              variant="button"
                              color="text.secondary"
                              component="div"
                            >
                              <i class="fas fa-calendar-day" style={{color:"#1bc8d4"}}> Scheduled</i>
                              
                            </Typography>
                          )}
                        </CardContent>
                      </CardActionArea>
                    </Card>
                  </Item>
                </Grid>
              );
            })}
        </Grid>
      </Box>
    </>
  );
}

export default SearchBar;
