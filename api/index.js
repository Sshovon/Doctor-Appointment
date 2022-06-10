const express = require('express');
const app = express()

require('dotenv').config()

const cors = require('cors')
app.use(cors())
const port = process.env.PORT || 5000
require('./src/db/mongoose')


const appointment = require('./src/routes/appointmentRoutes')
const mailRoute = require('./src/routes/mailRoute');


app.use(express.json());
app.use('/appointment',appointment)
app.use('/mail',mailRoute)



app.listen(port,()=>{
    console.log(`API is running on port ${port}`)
})