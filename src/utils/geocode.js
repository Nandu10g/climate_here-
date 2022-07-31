const request = require('request')

const geocode = (address,callback) =>{
    let url = "https://api.mapbox.com/geocoding/v5/mapbox.places/" + encodeURIComponent(address)  + ".json?access_token=pk.eyJ1IjoibWFub2hhcmRhbWlzZXR0aSIsImEiOiJja3VtOWNmNHcxbnpiMm5vejF5aTk4aHNyIn0.KsoH3xOMUF02oZWJnVh5Hw&limit=1"

    request({url:url, json:true},(error,res)=>{
        if(error) {
            callback("Unable to connect",undefined);
        }
        else if(res.body.features.length === 0) {
            callback("Please search for a valid location",undefined);
        }
        else {
            callback(undefined,{
                lat: res.body.features[0].center[1],
                lon: res.body.features[0].center[0],
                location: res.body.features[0].place_name
            })
        }
    })
}

module.exports = geocode