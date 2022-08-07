const { Schema, model } = require("mongoose");
const bcryptjs = require("bcryptjs");
const otpGenerator = require("otp-generator");

const otpSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
    },
    otp: {
      type: String,
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now(),
      index: {
        expires: 300,
      },
    }
  },
  { timestamps: true}
);


//static method
otpSchema.statics.verifyOTP = async function (email, code) {
  const otp = await OTP.findOne({ email });
  if (!otp) throw new Error("OTP expired");
  const isMatch = await bcryptjs.compare(code, otp.otp);
  if (!isMatch) throw new Error("OTP expired");
  await OTP.deleteOne({ _id: otp._id });
  return otp;
};

//instance method
otpSchema.methods.generateOTP = async function () {
  const otp = this;
  otp.otp = otpGenerator.generate(4, {
    upperCaseAlphabets: false,
    lowerCaseAlphabets: false,
    specialChars: false,
  });
  const code = otp.otp;
  await otp.save();
  return code;
};

//middleware
otpSchema.pre("save", async function (next) {
  const otp = this; //this is a mongoose object
  if (otp.isModified("otp")) {
    otp.otp = await bcryptjs.hash(otp.otp, 8);
  }
  
  next();
});

const OTP = model("OTP", otpSchema);
module.exports = OTP;
