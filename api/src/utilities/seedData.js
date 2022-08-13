const axios = require('axios')


const data = async ()=>{
    const credentials={
        email:"doctor@gmail.com",
        password:"123456"
    }
    const result=await axios.post(`http://localhost:${process.env.PORT}/doctor/signup`,credentials)
    console.log(result)

}

const appointmentData = async()=>{
    const apppointments=[{
        name: 'Mosum',
        email: 'fr@gmail.com',
        mobile: '11111111111',
        age: '23',
        schedule: '7-28-2022 9',
        visited: false,
        description: 'hh',
      },{
        name: 'Tosum',
        email: 'fr@gmail.com',
        mobile: '11111111111',
        age: '23',
        schedule: '7-29-2022 9',
        visited: false,
        description: 'hh',
      },
      {
        name: 'Losum',
        email: 'fr@gmail.com',
        mobile: '11111111111',
        age: '23',
        schedule: '7-28-2022 9.30',
        visited: false,
        description: 'hh',
      },
      {
        name: 'Aosum',
        email: 'fr@gmail.com',
        mobile: '11111111111',
        age: '23',
        schedule: '7-28-2022 7',
        visited: false,
        description: 'hh',
      },
      {
        name: 'Bosum',
        email: 'fr@gmail.com',
        mobile: '11111111111',
        age: '23',
        schedule: '7-22-2022 9',
        visited: false,
        description: 'hh',
      },
      {
        name: 'Nosum',
        email: 'fr@gmail.com',
        mobile: '11111111111',
        age: '23',
        schedule: '7-23-2022 9',
        visited: false,
        description: 'hh',
      },
    ]
    apppointments.map(async (el)=>{
        const result=await axios.post(`http://localhost:${process.env.PORT}/appointment/create`,el)
        console.log(result)
    })
}

const medData = async ()=>{
  const med=[
  {
    medName:"FLONTIN 250mg",
    medType:"Capsul"
  },
  {
    medName:"FaSt 250mg",
    medType:"Tablet"
  },
  {
    medName:"Napa 30mg",
    medType:"Tablet"
  },
  {
    medName:"Tuska",
    medType:"Syrup"
  },
  {
    medName:"Pantonix 50mg",
    medType:"Capsul"
  }
]
  const result=await axios.post(`http://localhost:${process.env.PORT}/medicine/add`,med)

}



const filterExpiredAppointment = async ()=>{
  const result = await axios.get(`http://localhost:${process.env.PORT}/appointment/expire`)
  //console.log(result.data)
}


//data();
//appointmentData()
medData()
filterExpiredAppointment()