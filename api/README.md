# Routes

## Appointment routes  `/appointment`

1.`/create`
```{
    "name":"",
    "email":"",
    "age":"",
    "schedule":"",
    "description":"",
    "mobile":"",
}
```
2.`/schedule/:date`

3.`/view`

## Mail routes `/mail`
1.`/send`
```{
    "schedule:"",
    "ID":"",
    "name":"",
    "email":""
}
```

## Prescription routes `/prescription`
1.`post /create`
```{
    "appointmentID":"x9e8ai",
    "doctorComment":"Fever",
    "drugs":[ 
        {
        "medName":"napa 500mg",
        "time":["Breakfast","Dinner"],
        "category":"Tablet",
        "duration:"7 days"
    },
    {
        "medName":"napa 500mg",
        "time":["Breakfast","Dinner"],
        "category":"Syrup",
         "duration:"7 days"
    },
    {
        "medName":"napa 500mg",
        "time":["Breakfast","Dinner"],
        "category":"Capsule",
         "duration:"7 days"
    },
        ],
    "tests":[
        {
            "test":"blood"
        },{
            "test":"diabetics"
        }
        ]
} 
```
2.`get /view?id=prescriptionid`


## Doctor routes `/doctor`

1. `/signin`

```{
    "email":"",
    "password":""

}
```
2. `/signup`
```{
    "email":"",
    "password":"",
    "aboutMe":"",
    "image":""

}
```