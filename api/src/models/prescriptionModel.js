const {Schema,model} = require('mongoose')
const validator = require('validator')
const createHash = require('hash-generator')
const hashLength=6



const prescriptionSchema = new Schema({
    ID:{
        type:String
    },
    doctorAdvise:{
        type:String
    },
    appointmentID:{
        type:String,
        required:true
    },
    drugs:[
        {
            medName:String,
            time:[
                {
                    type:String
                }
            ],
            medtype:{
                type:String,
                enum:['Tablet','Capsule','Syrup'],
                messsage:'{VALUE} is not a valid drug type'
            },
            duration:String,
        }
    ],
    tests:[
        {
            test:String
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