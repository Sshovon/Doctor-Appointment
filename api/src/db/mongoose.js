const mongoose = require('mongoose')
//console.log(process.env.DB_URL)

mongoose.connect('mongodb://localhost:27017/doctor_db',{ 
    useNewUrlParser: true,
    useUnifiedTopology:true
}).then(()=>{
    console.log("doctor-api database connected successfully")
}).catch(()=>{
    console.log("doctor-api database connection failed")
})
