const express = require('express')
const router = express.Router();

const Medicine = require('../models/medicineModel')

router.get('/view',async(req,res)=>{
    const result= await Medicine.find({}).sort({medName:1});  
    res.send(result)
})

router.post('/add',async(req,res)=>{
    const meds=req.body;
    //console.log(meds)
    meds.map(async(med)=>{
        
        med.medName=(med.medName.toLowerCase());
        med.medName=med.medName.charAt(0).toUpperCase() + med.medName.slice(1)
        const exists=await Medicine.find({medName:med.medName})
       if(!exists.length){
        const newMed={};
        newMed.medName=med.medName;
        newMed.medType=med.medType;
        const medicine=  new Medicine(newMed);
        await medicine.save();
        console.log("new med added")
       }

       
    })
    res.send("success");
})

module.exports = router