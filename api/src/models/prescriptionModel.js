const {Schema,model} = require('mongoose')
const validator = require('validator')
const createHash = require('hash-generator')
const hashLength=6



const prescriptionSchema = new Schema({
    ID:{
        type:String
    },
    doctorAdvise:[
        {
            type:String,
        }
    ],
    appointmentID:{
        type:String,
        required:true
    },
    drugs:[
        {
            name:String,
            time:String,
            medType:String,
            duration:String,
            comment:String
        }
    ],
    tests: String,
    nextVisit:String,
    oe:[
        {
            type:String,
        }
    ],
    complain:[
        {
            type:String,
        }
    ]
},{
    toJSON:{virtuals:true},
    toObject:{virtuals:true}
}) 


//for populate
prescriptionSchema.virtual('appointment',{
    ref:'Appointment',
    localField:'appointmentID',
    foreignField:'ID'
})

prescriptionSchema.methods.generateID = async function(){
    const user= this;
    user.ID=createHash(hashLength)
    await user.save();
}



const Prescription = model("Prescription", prescriptionSchema);
module.exports = Prescription