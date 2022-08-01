const express = require("express");
const router = express.Router();

const Schedule = require("../models/scheduleModel");
const Appointment = require("../models/appointmentModel");

router.post("/create", async (req, res) => {
  try {
    const { schedule, description } = req.body;
    const appointment = new Appointment({
      schedule,
      description,
    });
    const [date, time] = schedule.split(" ");

    await appointment.generateID();
    const appointmentDate = await Schedule.findOne({ date });
    await appointmentDate.bookSchedule(time);
    res.send(appointment);
  } catch (e) {
    const error = e.message;
    res.send({ error });
  }
});

router.get("/schedule/:date", async (req, res) => {
  try {
    const date = req.params.date;
    const schedules = await Schedule.findSchedule(date);
    res.send(schedules);
  } catch (e) {
    const error = e.message;
    res.send({ error });
  }
});
router.get("/reschedule", async (req, res) => {
  try {
    const {schedule} = req.body;
    const [date, time] = schedule.split(" ");
    const prevSchedule = await Schedule.findOne(date);
    prevSchedule.schedules.map(async(el)=>{
      if(el.time === time){
        el.booked=false;
      }
    })
    await prevSchedule.save();

    res.send({success:true});
  } catch (e) {
    const error = e.message;
    res.send({ error });
  }
});




router.get("/view", async (req, res) => {
  try {
    const ID = req.query.ID;
    if (ID) {
      const result = await Appointment.find({ ID });
      res.send(result);
    } else {
      const result = await Appointment.find({})
        .sort({ schedule: "asc" })
        .exec();
      console.log(result);
      res.send(result);
    }
  } catch (e) {
    const error = e.message;
    res.send({ error });
  }
});

module.exports = router;
