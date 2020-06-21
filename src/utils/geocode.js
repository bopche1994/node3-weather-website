const request = require('request')
const geocode = (address,callback)=> {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+address+'.json?access_token=pk.eyJ1IjoiYm9wY2hldml2ZWsiLCJhIjoiY2tiZGdlYjh5MGJudTJybnMwd3NpaDNweiJ9.81lQSB4R1NweIo15MZWbpg'
    // below encodeURIComponent takes care of special characters such as ? in the address variable
    // const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+encodeURIComponent(address)+'.json?access_token=pk.eyJ1IjoiYm9wY2hldml2ZWsiLCJhIjoiY2tiZGdlYjh5MGJudTJybnMwd3NpaDNweiJ9.81lQSB4R1NweIo15MZWbpg'
    request({url, json: true},(error, {body}={}) => {
        if (error){
            callback('Unable to connect to location services',undefined)
        }else if (body.message || body.features.length === 0){
            callback('Unable to find location. Please try with another place',undefined)
        }else{
            const longitude = body.features[0].center[0]
            const latitude  = body.features[0].center[1]
            const place     = body.features[0].place_name
            const data = {
                longitude,
                latitude,
                place
            }
            callback(undefined,data)
        }
    })    
}

module.exports = geocode


// const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+address+'.json?access_token=pk.eyJ1IjoiYm9wY2hldml2ZWsiLCJhIjoiY2tiZGdlYjh5MGJudTJybnMwd3NpaDNweiJ9.81lQSB4R1NweIo15MZWbpg'
// // below encodeURIComponent takes care of special characters such as ? in the address variable
// // const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+encodeURIComponent(address)+'.json?access_token=pk.eyJ1IjoiYm9wY2hldml2ZWsiLCJhIjoiY2tiZGdlYjh5MGJudTJybnMwd3NpaDNweiJ9.81lQSB4R1NweIo15MZWbpg'
// request({url: url, json: true},(error, response) => {
//     if (error){
//         callback('Unable to connect to location services',undefined)
//     }else if (response.body.message || response.body.features.length === 0){
//         callback('Unable to find location. Please try with another place',undefined)
//     }else{
//         const longitude = response.body.features[0].center[0]
//         const latitude = response.body.features[0].center[1]
//         const place = response.body.features[0].place_name
//         const data = {
//             longitude: longitude,
//             latitude: latitude,
//             place: place
//         }
//         callback(undefined,data)
//     }
// })    
// }

// // we want to use api for converting place location into lattitue and longitue(geo coding:address-> lat/long ) for that mapbox api is used

// const geocodeURL = 'https://api.mapbox.com/geocoding/v5/mapbox.places/Pune.json?access_token=pk.eyJ1IjoiYm9wY2hldml2ZWsiLCJhIjoiY2tiZGdlYjh5MGJudTJybnMwd3NpaDNweiJ9.81lQSB4R1NweIo15MZWbpg'

// request({url:geocodeURL,json:true},(error,response) => {
//     if (error) {
//         console.log('Unable to connect to geocoding service')
//     } else if (response.body.message || response.body.features.length === 0) {
//         console.log('Unable to find location. Please try with another place')
//     } else {
//     const longitutde = response.body.features[0].center[0]
//     const latitude = response.body.features[0].center[1]
//     console.log(response.body.features[0].text)
//     console.log(`longitude : ${longitutde}`)
//     console.log(`latitude : ${latitude}`)
// } })