const {Schema,model} = require('mongoose')
const validator = require('validator')


const scheduleSchema = new Schema({
    date:{
        type:String,
        required:true
    },
    schedules:[
        {
            time:String,
            booked:{
                type:Boolean,
                default:false
            }
        }
    ]
})


scheduleSchema.statics.findSchedule = async function(date){
    const schedule= await Schedule.find({date});
    if(schedule.length) return schedule;
    console.log('new date')
    const newSchedule = new Schedule({
        date
    });
    
    for(let i=6;i<11;i++){
        time=`${i}`
        newSchedule.schedules=newSchedule.schedules.concat({time})
        time=`${i}.30`
        newSchedule.schedules=newSchedule.schedules.concat({time})
        
    }
    //console.log(newSchedule.schedules)
    await newSchedule.save();
    return newSchedule;

}

scheduleSchema.methods.bookSchedule = async function(date,schedule){

}



const Schedule = model("Schedule",scheduleSchema);
module.exports=Schedule

