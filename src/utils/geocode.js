const request = require('request');

const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) +'.json?limit=1&access_token=pk.eyJ1IjoiY2hhbmR1MzI0NSIsImEiOiJjanp3aXFpNmIwMHdqM3Buc2Y4ZDRxem9pIn0._ILQminXZMdimbOgTwOgag';
    request({url, json: true }, (err, {body}) =>{
        if(err){
            callback('Unable to connect to location services',undefined);
        } else if(body.features.length === 0){
            callback('Unable to find location. try another search', undefined);
        } else {
            callback(undefined, {
                latitude: body.features[0].center[1],
                longitude: body.features[0].center[0],
                location: body.features[0].place_name
            });
        }
    })
}

module.exports = geocode;