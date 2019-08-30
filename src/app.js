const express = require('express');
const path = require('path');
const hbs = require('hbs');
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');

const app = express();
const port = process.env.PORT || 3000;

//Define paths for Express config
const publicDirPath = path.join(__dirname, '../public');//for static file access
const viewsPath = path.join(__dirname, '../templates/views'); //for custom views folder with views access
const partialsPath = path.join(__dirname, '../templates/partials');

//setup handlebars Engine and views location
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

//setup static directory to serve
app.use(express.static(publicDirPath));

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Chandrasekhar'
    });
});

app.get('/about', (req, res) => {
    res.render('about',
        {
            title: 'About',
            name: "Chandrasekhar"
        });
});

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        name: 'Chandrasekhar'
    });
});

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({ error: 'You must provide an address to get weather info' })
    }
    geocode(req.query.address, (errGeocode, {latitude, longitude, location} = {}) => {
        if(errGeocode){
            return res.send({errGeocode});
        }
        forecast(latitude, longitude, (err, data) => {
            if(err){
                return res.send({err});
            }
            res.send({
                forecast: data,
                location,
                address: req.query.address
            });
        });
    });
});

app.get('/products', (req, res) => {
    if (!req.query.search) {
        return res.send({ error: 'You must provide a search term' });
    }
    res.send({
        products: []
    });
});

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Chandrasekhar',
        errorMessage: 'Help Article not found'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Chandrasekhar',
        errorMessage: 'Page not found'
    });
});

app.listen(port, () => {
    console.log('Listening on port: '+ port)
});