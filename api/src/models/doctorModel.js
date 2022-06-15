const mongoose = require('mongoose')
const validator = require('validator')
const bcryptjs = require('bcryptjs')

const doctorSchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true
    },
    email: {
        type: String,
        required: true,
        trim: true,
        unique: true,
        lowercase: true,

        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error("Email is not an valid one!!!");
            }
        }
    },
    
    password: {
        type: String,
        minlength: 6,
        trim: true,
        required: true,
    },
    image: {
        type:String,
    },
    aboutMe:{
        type:String
    }
    
})
/////// Instance Methods ////////

doctorSchema.methods.toJSON = function () {
    const doctor = this;
    const doctorObject = doctor.toObject(); // converting mongoose document to plain js object

    delete doctorObject.password;
    return doctorObject;
}



/////// Static Methods ////////

doctorSchema.statics.verifyCredentials = async function (email, password) {
    const doctor = await Doctor.findOne({ email })
    if (!doctor)
        throw new Error("Invalid credentials")
    const isMatch = await bcryptjs.compare(password, doctor.password)
    if (!isMatch)
        throw new Error("Invalid credentials")
    return doctor;
}




/////// Middleware ///////

doctorSchema.pre('save', async function () {
    const doctor = this;
    if (doctor.isModified("password")) {
        doctor.password = await bcryptjs.hash(doctor.password, 8);
    }
})


const Doctor = mongoose.model('Doctor', doctorSchema)
module.exports = Doctor;