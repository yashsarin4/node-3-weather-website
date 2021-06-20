const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()
const port = process.env.PORT || 3000

const publicDirectoryPath = path.join(__dirname,'../public')
const viewsPath = path.join(__dirname,'../templates/views')
const partialPaths = path.join(__dirname,'../templates/partials')

//Setup handlebars engine and views location 
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialPaths)

//Setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req, res)=>{
    res.render('index',{
        title:'Weather',
        name:'Yash Sarin'
    })
})

app.get('/about', (req,res)=>{
    res.render('about',{
        title:'About myself',
        name: 'Yash'
    })
})

app.get('/help', (req,res) => {
    res.render('help', {
        message:'To know about cristiano ronaldo, please contact Yash',
        name: 'yash sarin',
        title: 'To get help, look here'
    })
} )

app.get('/weather', (req,res) => {
    if(!req.query.address){
        return res.send({
            error:'You must provide an address'}
            )
    }

    geocode(req.query.address, (error, {longitute, latitude, location})=>{
        if(error){
           return res.send({error})
        }

        forecast(longitute, latitude, (error, forecastData)=>{
            if(error){
               return res.send({error})
            }
            res.send({
                forecast:forecastData,
                location,
                address: req.query.address
            })
        } )
    })
})

app.get('/help/*', (req,res)=>{
    res.render('404', {
        title: '404',
        name:'Yash Sarin',
        errorMessage:'Help article not found'
    })
})

app.get('*', (req,res)=>{
    res.render('404', {
        title: '404',
        name:'Yash Sarin',
        errorMessage:'page not found'
    })
})

app.listen(port, ()=>{
    console.log('Server is up and running with port: ' + port)
})