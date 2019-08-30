// fetch('http://puzzle.mead.io/puzzle').then( (res) => {
//     res.json().then((data) => {
//         console.log(data);
//     })
// });

const weatherForm = document.querySelector('form');
const search = document.querySelector('input');
const msgOne = document.querySelector('#message-1');
const msgTwo = document.querySelector('#message-2');

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const location = search.value;
    msgOne.textContent = 'Loading...'
    msgTwo.textContent = ''
//local 'http://localhost:3000/weather?address=
    fetch('/weather?address=' + location).then((res) => {
        res.json().then((data) => {
            if (data.errGeocode) {
                msgOne.textContent = data.errGeocode
                // console.log(data.errGeocode)
            } else {
                msgOne.textContent = data.location
                msgTwo.textContent = data.forecast
                // console.log(data.location);
                // console.log(data.forecast)
            }
        })
    })
})