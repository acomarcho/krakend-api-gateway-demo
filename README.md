# krakend-api-gateway-demo
Demo of KrakenD's API gateway functionality using Grand Oak &amp; Pine Valley Hospital Mock API

![image](https://github.com/acomarcho/krakend-api-gateway-demo/assets/29671825/5e9ee6f7-5861-4407-96cd-785005b92cb4)

# How to start the services

## Starting the mock backend

To run the mock backend, simply use this command:
`java -jar ./mock-backend/DoctorInfo-JDK11.jar`

## Starting the PineValley adapter service

To run the adapter service, do these sequence of commands:

1. `cd pinevalley-adapter`
2. `npm i`
3. `node index.js`

This adapter is needed because you need KrakenD enterprise to actually send POST request with bodies, _sigh_.

## Starting the API gateway

To run the API gateway, do these sequence of commands:

1. `docker pull devopsfaith/krakend`
2. `docker run -p 8080:8080 -v "${PWD}:/etc/krakend/" devopsfaith/krakend`

# How to query the services

## Querying the mock backend

These are the valid values for doctor type:
1. Ophthalmologist
2. Physician
3. Pediatrician

### Grand Oak

`GET http://localhost:9091/grandOak/doctors/<doctorType>`

Here is the response:
```
{
    "doctors": {
        "doctor": [
            {
                "name": "Bob Watson",
                "time": "05:30 PM",
                "hospital": "Grand Oak"
            },
            {
                "name": "Paul Johnson",
                "time": "07:30 AM",
                "hospital": "Grand Oak"
            }
        ]
    }
}
```

### Pine Valley

`POST http://localhost:9090/pineValley/doctors`, send with this body:

```
{
  "doctorType": "<doctorType>"
}
```

Here is the response:
```
{
    "doctors": {
        "doctor": [
            {
                "name": "Bob Watson",
                "time": "07:30 AM",
                "hospital": "pineValley"
            },
            {
                "name": "Wilson Mcdonald",
                "time": "07:30 AM",
                "hospital": "pineValley"
            }
        ]
    }
}
```

## Querying the adapter for Pine Valley

`GET http://localhost:9092/pineValley/doctors/<doctorType>`

Here is the response:
```
{
    "doctors": {
        "doctor": [
            {
                "name": "Bob Watson",
                "time": "07:30 AM",
                "hospital": "pineValley"
            },
            {
                "name": "Wilson Mcdonald",
                "time": "07:30 AM",
                "hospital": "pineValley"
            }
        ]
    }
}
```

## Querying the API Gateway

`GET http://localhost:8080/doctors/<doctorType>`

Here is the response:
```
{
    "doctor": [
        {
            "hospital": "Grand Oak",
            "name": "Bob Watson",
            "time": "05:30 PM"
        },
        {
            "hospital": "Grand Oak",
            "name": "Paul Johnson",
            "time": "07:30 AM"
        },
        {
            "hospital": "pineValley",
            "name": "Bob Watson",
            "time": "07:30 AM"
        },
        {
            "hospital": "pineValley",
            "name": "Wilson Mcdonald",
            "time": "07:30 AM"
        }
    ]
}
```
