const {Schema,model} = require('mongoose')
const validator = require('validator')
const createHash = require('hash-generator')
const hashLength=6



const appointmentSchema = new Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        trim:true,
        lowercase:true,

        validate(value){
            if(!validator.isEmail(value)){
                throw new Error("Email is not valid")
            }
        }
    },
    mobile:{
        type:String,
        trim: true,
        required:true
    },
    age:{
        type:String,
        required:true
    },
    schedule:{
        type:String,
        required:true
    },
    ID:{
        type:String
    },
    visited:{
        type:Boolean,
        default:false
    },
    description:{
        type:String
    }
}) 


appointmentSchema.methods.generateID = async function(){
    const user= this;
    user.ID=createHash(hashLength)
    await user.save();

}



const Appointment = model("Appointment", appointmentSchema);
module.exports = Appointment