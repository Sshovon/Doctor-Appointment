const router = require("express").Router();
const OTP = require("../models/otpModel");
const { createTransport } = require("nodemailer");

router.post("/send", async (req, res) => {
  try {
    const { email } = req.body;console.log(req.body)

    const otp = new OTP({
      email
    });
    const code = await otp.generateOTP();
    const mailTransporter = createTransport({
      service: "gmail",
      auth: { user: process.env.mail, pass: process.env.pass },
    });
    console.log(code)

    const mailDetails = {
      from: "Doctor Appointment 👨‍⚕️ <web.devmail.00@gmail.com>",
      to: email,
      subject: `Verifying OTP`,
      text:`You requested for an OTP. Your OTP is ${code}. This will expire within 5 minutes.`,
      html:`<h3>You requested for an OTP. Your OTP is ${code}. This will expire within 5 minutes.<h3>`
    };
    await mailTransporter.sendMail(mailDetails);
    res.send(code);
  } catch (e) {
    const error = e.message;
    console.log(error)
    res.status(400).send({ error });
  }
});

router.post("/verify", async (req, res) => {
  try {
    
    const {otp,email} = req.body
    console.log(otp, email) 
    const result = await OTP.verifyOTP(email, otp);
    res.send({ message: result });
  } catch (e) {
    const error = e.message;
    res.status(400).send({ error });
  }
});

module.exports = router;
