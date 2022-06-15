const axios = require('axios')

const data = async ()=>{
    const credentials={
        email:"doctor@gmail.com",
        password:"123456"
    }
    const result=await axios.post(`http://localhost:${process.env.PORT}/doctor/signup`,credentials)
    console.log(result)
}

data();