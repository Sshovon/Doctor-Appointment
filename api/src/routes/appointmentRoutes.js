const express = require('express')
const router = express.Router();

const Schedule = require('../models/scheduleModel')
const Appointment=require('../models/appointmentModel');



router.post('/create',async (req,res)=>{
    try{
        const {email,mobile,age,schedule,name,description} =req.body;
        const appointment=new Appointment({
            name,email,age,schedule,mobile,description
        })
        console.log(schedule)     
        const [date,time] = schedule.split(' ');
        console.log(date)
        console.log(time)
        await appointment.generateID();
        const appointmentDate= await Schedule.findOne({date})
        console.log(appointmentDate)
        await appointmentDate.bookSchedule(time); 
        res.send(appointment);

    }catch(e){
        const error = e.message;
        res.send({error})
    }
})

router.get('/schedule/:date',async(req,res)=>{
    try{
        const date=req.params.date
        const schedules= await Schedule.findSchedule(date)
        res.send(schedules)


    }catch(e){
        const error = e.message;
        res.send({error})
    }
})

router.get('/view',async (req,res)=>{
    try{
        const result = await Appointment.find({});
        res.send(result)
    }catch(e){
        const error=  e.message;
        res.send({error})
    }
})



module.exports = router