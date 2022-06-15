const express = require('express')
const router = express.Router();

const Prescription = require('../models/prescriptionModel')


router.post('/create',async(req,res)=>{
    try{
        const {doctorComment,appointmentID,drugs,tests,nextVisit} = req.body;
        const prescription = new Prescription({
            doctorComment,drugs,tests,appointmentID,nextVisit
        })
        await prescription.generateID();
        
        const [result]=await Prescription.find({ID:prescription.ID}).populate('appointment')
        result.appointment[0].visited=true;
        await result.save()
        res.send(result)
        
    }catch(e){
        const error = e.message;
        res.send({error})
    }
})

router.get('/view',async(req,res)=>{
    try{

        
    }catch(e){
        const error = e.message;
        res.send({error})
    }
})



module.exports = router