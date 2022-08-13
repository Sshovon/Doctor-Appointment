const express = require("express");
const router = express.Router();

const Schedule = require("../models/scheduleModel");
const Appointment = require("../models/appointmentModel");
const Patient = require("../models/patientModel");

function isBeforeToday(date) {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return date < today;
}

router.post("/create", async (req, res) => {
  try {
    const { schedule, description, nid } = req.body;
    const patient = await Patient.find({ nid });
    if (!patient.length) {
      throw new Error("patient not registered");
    }
    const appointment = new Appointment({
      nid,
      schedule,
      description,
    });

    const [date, time] = schedule.split(" ");

    await appointment.generateID();
    const appointmentDate = await Schedule.findOne({ date });
    await appointmentDate.bookSchedule(time);
    const result = await appointment.populate("patient");

    res.send(result);
  } catch (e) {
    const error = e.message;
    res.send({ error });
  }
});

router.get("/schedule/:date", async (req, res) => {
  try {
    const date = req.params.date;
    console.log(`here is ${date}`);
    const schedules = await Schedule.findSchedule(date);
    res.send(schedules);
  } catch (e) {
    const error = e.message;
    res.send({ error });
  }
});
router.get("/reschedule/:id", async (req, res) => {
  try {
    const id = req.params.id;
    console.log(id);
    console.log(`reschedule is ${id}`);
    const [appointment] = await Appointment.find({ ID: id });
    const { schedule } = appointment;
    const [date, time] = schedule.split(" ");
    const prevSchedule = await Schedule.findOne({ date });
    prevSchedule.schedules.map(async (el) => {
      if (el.time === time) {
        el.booked = false;
      }
    });
    await prevSchedule.save();
    await Appointment.deleteOne({ ID: id });
    res.send({ success: true });
    console.log("success");
  } catch (e) {
    const error = e.message;
    console.log(error);
    res.send({ error });
  }
});

router.get("/view", async (req, res) => {
  try {
    const ID = req.query.ID;
    if (ID) {
      const result = await Appointment.find({ ID }).populate("patient");
      res.send(result);
    } else {
      const result = await Appointment.find({})
        .populate("patient")
        // .sort({ schedule: "asc" })
        .exec();

      result.sort((a, b) => {
        const [aDate, aTime] = a.schedule.split(" ");
        const [bDate, bTime] = b.schedule.split(" ");

        const aDateObj = new Date(aDate);
        const bDateObj = new Date(bDate);
        if (aDateObj - bDateObj === 0) return aTime - bTime;
        return aDateObj - bDateObj;
      });
      //console.log(result);
      res.send(result);
    }
  } catch (e) {
    const error = e.message;
    res.send({ error });
  }
});

router.get("/expire", async (req, res) => {
  try {
    const data = await Appointment.find({});
    data.map(async (item) => {
      const date = item.schedule.split(" ")[0];
      if (isBeforeToday(new Date(date)) && !item.visited) {
        item.expired = true;
      }
      await item.save();
    });
    res.send(data);
  } catch (e) {
    const error = e.message;
    res.send({ error });
  }
});

module.exports = router;
