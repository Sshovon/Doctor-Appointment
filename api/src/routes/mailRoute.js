const express = require('express')
const router = express.Router();

const {createTransport} = require('nodemailer')


router.post('/send',async(req,res)=>{
    try{
        const {schedule,ID, patient} = req.body;
        console.log('in mail send')
        console.log(req.body)
        console.log(schedule,ID,patient)
        const transport =createTransport({
            service:'gmail',
            auth:{
                user:process.env.mail,
                pass:process.env.pass
            }
        })
        const email=patient[0].email;
        const name=patient[0].name
        const mailOptions={
            from:'Doctor Appointment 👨‍⚕️ <web.devmail.00@gmail.com>',
            to:`${email}`,
            subject:'Appointment Confirmation',
            text:`Dear ${name}, You requested for an appointment to Dr.X, here is your appointment confirmation.\nYour patientID is ${ID} and you are supposed to visit at ${schedule}`,
            html:`<h3>Dear ${name},<br> You requested for an appointment to Dr.X, here is your appointment confirmation.\nYour patientID is ${ID} and you are supposed to visit at ${schedule}PM<h3>`
        }

        //const result = await transport.sendMail(mailOptions);
        const result="success"
        res.send({result});

    }catch(e){
        const error = e.message;
        res.send({error})
    }
})

module.exports = router