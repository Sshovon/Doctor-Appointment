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
1.`/create`
```{
    "appointmentID":"x9e8ai",
    "doctorComment":"Fever",
    "drugs":[ {
        "drug":"napa",
        "dose":"100mg",
        "time":"101",
        "category":"tablet"
    },
    {
        "drug":"fast",
        "dose":"100mg",
        "time":"111",
        "category":"tablet"
    },
    {
        "drug":"ace",
        "dose":"100mg",
        "time":"101",
        "category":"tablet"
    }
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