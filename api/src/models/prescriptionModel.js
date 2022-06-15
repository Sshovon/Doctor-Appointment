const {Schema,model} = require('mongoose')
const validator = require('validator')
const createHash = require('hash-generator')
const hashLength=6



const prescriptionSchema = new Schema({
    ID:{
        type:String
    },
    doctorComment:{
        type:String
    },
    appointmentID:{
        type:String,
        required:true
    },
    drugs:[
        {
            drug:String,
            dose:String,
            time:{
                type:String,
                default:'000'
            },
            category:{
                type:String,
                enum:['tablet','capsule','liquid'],
                messsage:'{VALUE} is not a valid drug type'
            }
        }
    ],
    tests:[
        {
            test:String
        }
    ],
    nextVisit:{
        type:String,
        default:"After 1 week"
    }
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