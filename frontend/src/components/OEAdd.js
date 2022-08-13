import { Autocomplete, TextField } from '@mui/material'
import React, { useState } from 'react'


const defOEs = ["eat healthy food","exercise daily", "had fever for 3 days"]

function OEAdd({handleOE}) {

    const [oe, setOE] = useState("")
    const handleEnter=(e)=>{
        console.log(e)
        if(e.key === 'Enter') {
            handleOE(e.target.value)
            setOE("")
        }
        
      }

  return (
    <div>
        <Autocomplete
            id="combo-box-demo"
            freeSolo
            options={defOEs}
            sx={{ width: 220 }}
            value={oe}
            onChange={(event, value) => {
                console.log(event, value)
                setOE(value)
                
            }}
            
            ListboxProps={{ style: { maxHeight: "10rem" } }}
            renderInput={(params) => (
              <TextField onKeyDown={e => {handleEnter(e)}} variant="standard" {...params} placeholder="add O/E"/>
            )}
          />
    </div>
  )
}

export default OEAdd