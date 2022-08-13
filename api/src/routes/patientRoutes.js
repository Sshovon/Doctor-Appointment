const express = require('express')
const router = express.Router();

const Patient = require('../models/patientModel')
const Appointment = require('../models/appointmentModel')

router.post('/register',async(req,res)=>{
    try{
        const {name,fatherName,motherName,dob,email,nid,gender,mobile} = req.body;
        const patient = new Patient({
            name,fatherName,motherName,dob,nid,gender,email,mobile
        });
        await patient.save();
        res.send(patient)
    }catch(e){
        res.send({error:e.message})
    }
})

router.post('/check',async(req,res)=>{
    try{
        const response={}
        const {nid,ID} = req.body;
        const patient = await Patient.find({nid});
        const appointment = await Appointment.find({ID});
        if(!patient.length)
            response.error="patient is not registered";
        else if(!appointment.length){    
            response.error="appointment not found";
        }else{
            response.success=true
        }
        res.send(response)
    }catch(e){
        res.send({error:e.message})
    }
})
module.exports = router