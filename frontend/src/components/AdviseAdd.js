import { Autocomplete, TextField } from '@mui/material'
import React, { useState } from 'react'

const defAdvices = ["eat healthy food","exercise daily", "had fever for 3 days"]

function AdviseAdd({handleAdvise}) {
    const [advise, setAdvise] = useState("")

    const handleEnter=(e)=>{
        console.log(e)
        if(e.key === 'Enter') {
            handleAdvise(e.target.value)
            setAdvise("")
        }
        
      }

  return (
    <div>
        <Autocomplete
            id="combo-box-demo"
            freeSolo
            options={defAdvices}
            sx={{ width: 220 }}
            value={advise}
            onChange={(event, value) => {
                console.log(event, value)
                setAdvise(value)
                
            }}
            
            ListboxProps={{ style: { maxHeight: "10rem" } }}
            renderInput={(params) => (
              <TextField onKeyDown={e => {handleEnter(e)}} variant="standard" {...params} placeholder="add advice" />
            )}
          />
    </div>
  )
}

export default AdviseAdd