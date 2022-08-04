const { Schema, model } = require("mongoose");
const validator = require("validator");
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
    gender: {
      type: String,
      required: true,
    },
    nid: {
      type: String,
      required: true,
      unique: true,
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
  localField: "nid",
  foreignField: "nid",
});

patientSchema.methods.toJSON = function () {
  const patient = this.toObject();
  //console.log(patient)
  delete patient._id;
  let today = new Date();
  let birthDate = new Date(patient.dob);
  let age = today.getFullYear() - birthDate.getFullYear();
  let m = today.getMonth() - birthDate.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate()))  {
    age--;
  }
  patient.age=age;
  return patient;
};


const Patient = model("Patient", patientSchema);
module.exports = Patient;
