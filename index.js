let express = require('express')
let app = express()
let request = require('request');
const apiURL = 'https://holidayapi.pl/v1/holidays'

var db = require('./database/mongodb')

app.use(express.static('public'))

const port = process.env.PORT || 8081
const country = 'FR'
const countryName = 'France'
var year = 2015
let connectionString = 'mongodb://' + process.env.DATABASE_USERNAME + ':' + process.env.DATABASE_PASSWORD + '@' + process.env.DATABASE_HOST + ':' + process.env.DATABASE_PORT + '/' + process.env.DATABASE_NAME;

db.connect(connectionString + '?retryWrites=true', function(err) {
    if (err) {
        console.log('Unable to connect to Mongo.')
        console.log(err)
        process.exit(1)
    } else {
        app.listen(port, () => {
            console.info("Server Start Listening...")
            const holidayDB = db.get().db("test-db").collection("Holidays")

            /**
             * Country-code exemple : FR, US
             * Supported countries :
             * BA Belgium
             * BR Brazil
             * CA Canada
             * CZ Czechia
             * DK Denmark (NEW!)
             * DE Germany
             * FR France
             * GB Great Britain
             * NO Norway
             * PL Poland
             * RU Russia (NEW!)
             * SK Slovakia
             * SL Sierra Leone
             * VN Vietnam (NEW!)
             * ID Indonesia
             * US United States
             */
            while(year < 2040) {
                year++
                let options = {
                    headers: {
                        'Content-Type' : "application/json"
                    },
                    url: apiURL + '?country='+country +'&year=' + year
                }
                request.get(options, (error, response, body) => {
                    if(response.statusCode == 403) {
                        return error
                    }
                    body = JSON.parse(body)
                    let holidays = body.holidays
                    
                    var days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
                    for(var key in holidays) {
                        var objectToInsert = {
                            name : holidays[key][0].name,
                            country: countryName,
                            countryISOCode : holidays[key][0].country,
                            date: new Date(holidays[key][0].date),
                            weekday: days[new Date(holidays[key][0].date).getDay()],
                            holidayType : holidays[key][0].public == true ? 'National holiday' : 'Non national holiday'
                        }
                        holidayDB.insertOne(objectToInsert, (err,res) => { })
                        console.log(objectToInsert)
                    }
                    
                })
            }

        })
    }
})