const express = require('express');
const hbs = require('hbs')
const path = require('path');  
const { location} = require('./utils/utils');

const app =  express();



app.set("view engine", 'hbs')
app.set('views', path.join(__dirname, '../templates/views'))
hbs.registerPartials(path.join(__dirname, '../templates/partials'))

app.use(express.static(path.join(__dirname, '../public')))

app.use('/weather', (req, res, next) => {
    if(req.query.address){
        location(req.query.address, (err, data) => {
            if(err){
                res.send({
                    error: "Put a correct location, and try again"
                })
            }
            else {
                req.data = data;
                next();
            }
        });
       
}
})


app.get('/', (req, res, next) => {
    res.render('index', {
        title: 'Weather app',
        name: 'Eddy'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: "About me",
        name: 'Eddy'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        message: "No help available",
        title: 'Help page',
        name: 'Eddy'
    })
})

app.get('/weather', (req, res, next) => {
    res.send(
        {
            location : req.data.location.name,
            temperature: req.data.current.temperature,
            feelslike: req.data.current.feelslike,
            weather_descriptions: req.data.current.weather_descriptions[0]
        })
})

app.get('/help/*', (req, res) => {
  res.render('404Page', {
      Message: "404 No help"
  })
})

app.get('*', (req, res) => {
    res.render('404Page', {
        Message: "404 Fuck you!!No help"
    })

})


app.listen(3000, () => {
    console.log('Server listening!')
})