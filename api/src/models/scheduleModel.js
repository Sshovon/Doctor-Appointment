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
    console.log(`date in findschedule ${date}`)
    const schedule= await Schedule.find({date});
    if(schedule.length) return schedule[0];
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

scheduleSchema.methods.bookSchedule = async function(time){
    console.log(`time in bookschedule ${time}`)
    const schedule =this;
    schedule.schedules.every((element)=>{
        if(element.time===time){
            element.booked=true;
            return false;
        }

        return true
    })

    await schedule.save();

    
}



const Schedule = model("Schedule",scheduleSchema);
module.exports=Schedule

