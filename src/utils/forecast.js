const request = require('request')
const forecast = (latitude, longitude, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=9f68e3ad106fe5758c19917f84895845&query='+latitude+','+longitude+'&units=f'
    request({url, json: true},(error,{body}={}) => {
        if (error) {
            callback('Unable to connect to weather service',undefined)
        } else if (body.error || !body.location.name) {
            callback('Unable to find loaction',undefined)
        } else {
            callback(undefined,` Weather description is ${body.current.weather_descriptions[0]}. It is currently ${body.current.temperature} degree out.It feels like ${body.current.feelslike} degree out.`)
            // callback(undefined,`Location:${response.body.location.region} and country is ${response.body.location.country} and weather description is ${response.body.current.weather_descriptions[0]}. It is currently ${response.body.current.temperature} degree out.It feels like ${response.body.current.feelslike} degree out.`)
        }
    })
}
module.exports = forecast
// const forecast = (latitude, longitude, callback) => {
//     const url = 'http://api.weatherstack.com/current?access_key=9f68e3ad106fe5758c19917f84895845&query='+latitude+','+longitude+'&units=f'
//     request({url: url, json: true},(error,response) => {
//         if (error) {
//             callback('Unable to connect to weather service',undefined)
//         } else if (response.body.error || !response.body.location.name) {
//             callback('Unable to find loaction',undefined)
//         } else {
//             callback(undefined,` Weather description is ${response.body.current.weather_descriptions[0]}. It is currently ${response.body.current.temperature} degree out.It feels like ${response.body.current.feelslike} degree out.`)
//             // callback(undefined,`Location:${response.body.location.region} and country is ${response.body.location.country} and weather description is ${response.body.current.weather_descriptions[0]}. It is currently ${response.body.current.temperature} degree out.It feels like ${response.body.current.feelslike} degree out.`)
//         }
//     })
// }


// // this api gives the weather details based on latitude and logitide(forecast)
// const url = 'http://api.weatherstack.com/current?access_key=9f68e3ad106fe5758c19917f84895845&query=37.8267,-122.4233&units=f'

// request({url:url,json:true},(error,response) => {
//     // const data = JSON.parse(response.body)
//     // console.log(response.body.current.weather_descriptions[0])
//     if (error) {
//         console.log('Unable to connect to weather service')
//     } else if (response.body.error) {
//         console.log('Unable to find loaction')
//     } else {
//         console.log(`${response.body.current.weather_descriptions[0]}. It is currently ${response.body.current.temperature} degree out.It feels like ${response.body.current.feelslike} degree out.`)
//     }
//     } )
