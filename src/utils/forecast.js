const request = require('request')

const forecast = (lat,lon,callback) => {
    coords = '' + lat + ',' + lon;

    url = "http://api.weatherstack.com/current?access_key=7c135dc6e49947f7abf35b7749bb5410&query=" + coords

    request({url: url, json: true},(err,res) => {
        if(err) {
            callback('Unable to connect',undefined);
        }
        else if(res.body.error) {
            callback('Unable to find location',undefined)
        }
        else {
            // console.log(res.body)
            const curr = res.body.current
            callback(undefined,`Weather is ${curr.weather_descriptions[0]} with ${curr.humidity}% humidity. Temperature is ${curr.temperature}C, feels like ${curr.feelslike}C.`)
        }
    })
}

module.exports = forecast