const fetch = require('node-fetch');

// call third party API for time series data
const getTime = (req, res) => {
  fetch('https://pomber.github.io/covid19/timeseries.json')
    .then(response => response.json())
    .then(data => {
      // decide if data storage/processing done in backend/frontend
    })
};

// const getTimeCountry (to be implemented?)

module.exports = {
  getTime
};