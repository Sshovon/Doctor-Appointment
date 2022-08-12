const {Schema,model} = require('mongoose')
const validator = require('validator')
const createHash = require('hash-generator')
const hashLength=6



const appointmentSchema = new Schema({
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
    },
    nid:{
        type:String
    },
    expired:{
        type:Boolean,
        default:false
    }
},{
    toJSON:{virtuals:true},
    toObject:{virtuals:true}
}) 

appointmentSchema.virtual('patient',{
    ref:'Patient',
    localField:'nid',
    foreignField:'nid'
})



appointmentSchema.methods.generateID = async function(){
    const user= this;
    user.ID=createHash(hashLength)
    console.log(`in id ${user}`)
    await user.save();

}



const Appointment = model("Appointment", appointmentSchema);
module.exports = Appointment