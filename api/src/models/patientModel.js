const { Schema, model } = require("mongoose");

const patientSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    fatherName: String,
    motherName: String,
    dob: {
      type: String,
      required: true,
    },
    gender:{
        type:String,
        required:true
    },
    nid: {
        type:String,
        required:true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,

      validate(value) {
        if (!validator.isEmail(value)) {
          throw new Error("Email is not valid");
        }
      },
    },
    mobile: {
      type: String,
      trim: true,
      required: true,
    },
    appointments: [
      {
        appointmentID: String,
      },
    ],
    prescriptions: [
      {
        prescriptionID: String,
      },
    ],
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

patientSchema.virtual("appointment", {
  ref: "Appointment",
  localField: "appointmentID",
  foreignField: "ID",
});

const Patient = model("Patient", patientSchema);
module.exports = Patient;
