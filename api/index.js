const express = require('express');
const app = express()

require('dotenv').config()

const cors = require('cors')
app.use(cors())
const port = process.env.PORT || 5000
require('./src/db/mongoose')
require('./src/utilities/seedData')


const appointment = require('./src/routes/appointmentRoutes')
const mailRoute = require('./src/routes/mailRoute');
const prescriptionRoutes= require('./src/routes/prescriptionRoutes')
const doctorRoutes= require('./src/routes/doctorRoutes')
const medicineRoutes=require('./src/routes/medicineRoutes')
const patientRoutes=require('./src/routes/patientRoutes')
const otpRoutes=require('./src/routes/otpRoutes')

app.use(express.json());
app.use('/appointment',appointment)
app.use('/mail',mailRoute) 
app.use('/prescription',prescriptionRoutes)
app.use('/doctor',doctorRoutes)
app.use('/medicine',medicineRoutes)
app.use('/patient',patientRoutes)
app.use('/otp',otpRoutes)



app.listen(port,()=>{
    console.log(`API is running on port ${port}`)
})