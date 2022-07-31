const path = require('path')
const express = require('express')
const hbs = require('hbs')

const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()
const port = process.env.PORT || 3000

// making paths for express and hbs
const publicDir = path.join(__dirname,'../public')
const viewsPath = path.join(__dirname,'../templates/views')
const partialsPath = path.join(__dirname,'../templates/partials')

// We are using public directory as base
app.use(express.static(publicDir))

/*
Due to above "use" statement below "get" will never run
since public has a file with special name "index.html" it will be loaded autmatically
instead of below "get"
*/

// app.get('', (req,res)=>{
//     res.send('Hello express!')
// })

// app.get('/help',(req,res)=>{
//     res.send('Help page')
// })

// app.get('/about',(req,res)=>{
//     res.send('About page')
// })

app.set('view engine','hbs')
app.set('views',viewsPath)
hbs.registerPartials(partialsPath)


app.get('',(req,res)=>{
    res.render('index',{
        title: "Weather App",
        name: 'Manohar'
    })
})

app.get('/about',(req,res)=>{
    res.render('about',{
        title: 'About Me',
        name: 'Manohar'
    })
})

app.get('/help',(req,res)=>{
    res.render('help',{
        title: 'Help page',
        name: 'Manohar',
        message: 'Help message'
    })
})

app.get('/weather',(req,res)=>{
    if(!req.query.address) {
        return res.send({error: 'Plase provide address'})
    }
    
    const address = req.query.address;

    geocode(address,(err,{lat,lon,location} = {})=>{
        if(err) {
            return res.send({error: err})
        }
        
        forecast(lat, lon, (error, data) => {
            if(error) {
                return res.send({error: error})
            }
    
            res.send({
                location: location,
                data: data,
                address: address
            })
        })
    })
})

app.get('/help/*',(req,res)=>{
    res.render('404',{
        title: '404',
        name: 'Manohar',
        error: 'Help article not found'
    })
})

app.get('*',(req,res)=>{
    res.render('404',{
        title: '404',
        name: 'Manohar',
        error: 'Page not found'
    })
})

app.listen(port, ()=>{
    console.log('Server is up on port ' + port)
})