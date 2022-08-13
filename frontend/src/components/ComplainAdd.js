import { Autocomplete, TextField } from '@mui/material'
import React, { useEffect, useState } from 'react'

const defComplains = ["eat healthy food","exercise daily", "had fever for 3 days"]

function ComplainAdd({handleComplain}) {
    const [complain, setComplain] = useState("")

    const handleEnter=(e)=>{
      console.log(e)
      if(e.key === 'Enter') {
      handleComplain(e.target.value)  
        setComplain("")
      }
      
    }


  return (
    <div>
        <Autocomplete
            id="combo-box-demo"
            freeSolo
            options={defComplains}
            sx={{ width: 220 }}
            value={complain}
            onChange={(event, value) => {
                console.log(event, value)
                setComplain(value)
                
            }}
            
            ListboxProps={{ style: { maxHeight: "10rem" } }}
            renderInput={(params) => (
              <TextField onKeyDown={e => {handleEnter(e)}} variant="standard" {...params} placeholder="add complain" />
            )}
          />
    </div> 
  )
}

export default ComplainAdd