const express = require('express');
const app = express()
const port = process.env.PORT || 5000
require('./src/db/mongoose')

const appointment = require('./src/routes/appointmentRoutes')


app.use(express.json());
app.use('/appointment',appointment)



app.listen(port,()=>{
    console.log(`API is running on port ${port}`)
})