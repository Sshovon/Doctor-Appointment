const express = require('express')
const router = express.Router();

const Doctor = require('../models/doctorModel');


router.post('/signin',async(req,res)=>{
    try{
        const { email, password} = req.body;
        const doctor= await Doctor.verifyCredentials(email,password);
        if(!doctor) throw new Error("Invalid credentials")
        res.send(doctor);
    }catch(e){
        const error = e.message;
        res.send({error})
    }
})
router.post('/signup',async(req,res)=>{
    try{  const { email, password ,image, aboutMe} = req.body;
    const doctor = new Doctor({
        email, password, image, aboutMe
    })
    await doctor.save()
    res.send(doctor);


    }catch(e){
        const error = e.message;
        res.send({error})
    }
})

module.exports = router