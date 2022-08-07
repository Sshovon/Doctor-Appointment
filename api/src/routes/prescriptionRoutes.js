const express = require('express')
const router = express.Router();

const Prescription = require('../models/prescriptionModel')
const Appointment = require('../models/appointmentModel')

router.post('/create',async(req,res)=>{
    try{
        console.log(req.body);
        const {doctorAdvise,appointmentID,drugs,tests,oe,complain,nextVisit} = req.body;
        const prescription = new Prescription({
            doctorAdvise,drugs,tests,appointmentID,oe,complain,nextVisit
        })
        await prescription.generateID();
        const [appointment] = await Appointment.find({ID:appointmentID})
        appointment.visited=true;
        await appointment.save()
        
        const [result]=await Prescription.find({ID:prescription.ID}).populate('appointment')
        result.appointment[0].visited=true;
        await result.save()
        console.log(result)
        res.send("success")
        
    }catch(e){
        const error = e.message;
        res.send({error})
    }
})

router.get('/view',async(req,res)=>{
    try{
        const ID=req.query.id;
        //console.log(ID)
        const [appointment]=await Appointment.find({ID})
        const [prescription]=await Prescription.find({appointmentID:ID})
        console.log(appointment)
        console.log(prescription)
        res.send({
            appointment,
            prescription
        })
        
    }catch(e){
        const error = e.message;
        res.send({error})
    }
})




module.exports = router