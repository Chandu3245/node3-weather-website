const request = require('request');

const forecast = (latitude, longitude, callback) => {
    const url = 'https://api.darksky.net/forecast/46595c80d3836fce5ae7d022b3bb6ff4/' + latitude+',' + longitude +'?units=si&lang=en';
    request({url, json: true}, (err, {body}) => {
        if(err){
            callback('Unable to find weather reports for given location', undefined);
        } else if(body.error){
            callback('Unable to find location', undefined);
        }else {
            callback(err, `${body.daily.data[0].summary} It is currently ${body.currently.temperature} degrees out, There is a ${body.currently.precipProbability}% chance of rain`)
        }
    });
}

module.exports = forecast;