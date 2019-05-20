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

db.connect('mongodb://164.132.192.130:19995/neo-arch?retryWrites=true', function(err) {
    if (err) {
        console.log('Unable to connect to Mongo.')
        console.log(err)
        process.exit(1)
    } else {
        app.listen(port, () => {
            console.info("Server Start Listening...")
            let holidayDB = db.get().db("neo-arch").collection("placement")


            holidayDB.updateMany({ customText31 : null, customText23 : "Full Time"}, { $set : { customText31 : 1 } }, (err,res) => { console.log("fffff") })
            holidayDB.updateMany({ customText31 : null, customText23 : "Full Time "}, { $set : { customText31 : 1 } }, (err,res) => {  console.log("fffff") }) 
            holidayDB.updateMany({ customText31 : null, customText23 : "Full Time / Part Time"}, { $set : { customText31 : 1 } }, (err,res) => { console.log("fffff") })
            holidayDB.updateMany({ customText31 : null, customText23 : "Part Time"}, { $set : { customText31 : 0.5 }} , (err,res) => { console.log("fffff") })
            holidayDB.updateMany({ customText31 : null, customText23 : "Temps plein"}, { $set : { customText31 : 1 } }, (err,res) => {  console.log("fffff") }) 
            holidayDB.updateMany({ customText31 : null, customText23 : null}, { $set : { customText31 : 1 } }, (err,res) => {  console.log("fffff") }) 
            holidayDB.updateMany({ customText31 : "", customText23 : "Full Time"}, { $set : { customText31 : 1 } }, (err,res) => { console.log("fffff") })
            holidayDB.updateMany({ customText31 : "", customText23 : "Full Time "}, { $set : { customText31 : 1 } }, (err,res) => {  console.log("fffff") }) 
            holidayDB.updateMany({ customText31 : "", customText23 : "Full Time / Part Time"}, { $set : { customText31 : 1 } }, (err,res) => { console.log("fffff") })
            holidayDB.updateMany({ customText31 : "", customText23 : "Part Time"}, { $set : { customText31 : 0.5 }} , (err,res) => { console.log("fffff") })
            holidayDB.updateMany({ customText31 : "", customText23 : "Temps plein"}, { $set : { customText31 : 1 } }, (err,res) => {  console.log("fffff") }) 
            holidayDB.updateMany({ customText31 : "", customText23 : null}, { $set : { customText31 : 1 } }, (err,res) => { console.log("fffff") })
            holidayDB.updateMany({ customText31 : " ", customText23 : "Full Time"}, { $set : { customText31 : 1 } }, (err,res) => { console.log("fffff") })
            holidayDB.updateMany({ customText31 : " ", customText23 : "Full Time "}, { $set : { customText31 : 1 } }, (err,res) => {  console.log("fffff") }) 
            holidayDB.updateMany({ customText31 : " ", customText23 : "Full Time / Part Time"}, { $set : { customText31 : 1 } }, (err,res) => { console.log("fffff") })
            holidayDB.updateMany({ customText31 : " ", customText23 : "Part Time"}, { $set : { customText31 : 0.5 }} , (err,res) => { console.log("fffff") })
            holidayDB.updateMany({ customText31 : " ", customText23 : "Temps plein"}, { $set : { customText31 : 1 } }, (err,res) => {  console.log("fffff") }) 
            holidayDB.updateMany({ customText31 : " ", customText23 : null}, { $set : { customText31 : 1 } }, (err,res) => { console.log("fffff") })
            holidayDB.updateMany({ customText31 : "25%" }, { $set : { customText31 : 0.25 } }, (err,res) => { console.log("fffff") })
            holidayDB.updateMany({ customText31 : "50%" }, { $set : { customText31 : 0.5 } }, (err,res) => { console.log("fffff") })
            holidayDB.updateMany({ customText31 : "100%" }, { $set : { customText31 : 1 } }, (err,res) => { console.log("fffff") })
            holidayDB.updateMany({ customText31 : "75%" }, { $set : { customText31 : 0.75 } }, (err,res) => { console.log("fffff") })

            holidayDB.deleteMany({dateEnd : null}, function(err, obj) {
                if (err) throw err;
                console.log(obj.result.n + " document(s) deleted");
            })
        })
    }
})