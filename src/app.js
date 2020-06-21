const path = require('path')
const express =require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')


//  console.log(__dirname)
//  console.log(path.join(__dirname,'../public'))
// console.log(__filename)
const app = express()
const port = process.env.PORT || 3000

// Defines path for express config
const publicDirectoryPath = path.join(__dirname,'../public')
const viewsPath = path.join(__dirname,'../templates/views')
const partialsPath = path.join(__dirname,'../templates/partials')

// default folder is views for express to use view engine gor rendering individual routes but if we want 
//  to customize by changing name of veiws folder to template in that case we need to set view path to that folder

// setup handlebars engine and views location
app.set('view engine','hbs')
app.set('views',viewsPath)
hbs.registerPartials(partialsPath)

// setups static directory to use
 app.use(express.static(publicDirectoryPath))



// above line performs the functionality of the below line i.e. rendering the home about help html pages
// app.get('',(req,res)=>{
//     // res.send('Hello Express')
//     res.send('<h1> Home Page </h1>')
// })
// app.get('/help',(req,res)=>{
//     // res.send('Help Page')
//     res.send([{name:'Vivek',
//               age : 15          
//             },{
//                 name:'Node',
//                 age: 06
//             }])
// })

// app.get('/about',(req,res)=>{
//     // res.send('About Page')
//     res.send('<h1> About Page </h1>')
// })




//  dynamic template rendering using hbs
app.get('',(req,res)=>{
    res.render('index',{
        title:'Weather App',
        name: 'Vivek Bopche'
    })
})

app.get('/about',(req,res)=>{
    res.render('about',{
        title:'About',
        name: 'Vivek Bopche'
    })
})

app.get('/help',(req,res)=>{
    res.render('help',{
        helpText: 'Rendering help page dynamically',
        title: 'Help',
        name: 'Vivek Bopche'
    })
})

app.get('/weather',(req,res)=>{
    
    if(!req.query.address){
        return res.send({
            error:'Please enter location to see the weather'
        })
    }
    const location = req.query.address
    geocode(location,(error,{latitude,longitude,place}={})=>{
        if (error){
            return res.send({
                error
            })
    
        }else{            
            forecast(latitude, longitude, (error, forecastData) => {
                if (error){
                    // return console.log('Error', error)
                    return res.send({
                        error
                    })
                }
                // console.log('Place: '+ place)
                // console.log('Data: '+ forecastData)
                res.send({
                    Location:place,
                    Forecast: forecastData,
                    address:req.query.address

                })
              })
        }
    })
    // res.send({
    //     forecast:'Partly Cloudy',
    //     location: 'Balaghat',
    //     address:req.query.address
    // })
})

// app.get('/help/*',(req,res)=>{
//     res.send('Help article not found')
// })

app.get('/help/*',(req,res)=>{
    res.render('404',{
        title:'404',
        name: 'Vivek Bopche',
        errorMessage:'Help article not found.'
    })
})

// wilcard character for routes entered by the user which does not match with any of the above routes

// app.get('*',(req,res)=>{
//     res.send('404 page not found')
// })

app.get('*',(req,res)=>{
    res.render('404',{
        title:'404 Page',
        name:'Vivek Bopche',
        errorMessage:'Page not found.'
    })
})




app.listen(port,()=>{
    console.log('Server is up on port'+ port )
})