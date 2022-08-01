const express = require('express')
const router = express.Router();

const Patient = require('../models/patientModel')


router.post('/register',async(req,res)=>{
    try{
        const {name,fatherName,motherName,dob,email,nid,gender,mobile} = req.body;
        const patient = new Patient({
            name,fatherName,motherName,dob,nid,gender,email
        });
        await patient.save();
    }catch(e){
        res.send({error:e.message})
    }
})

module.exports = router