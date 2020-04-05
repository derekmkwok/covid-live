const fetch = require('node-fetch');

// call third party API for time series data
const getTime = (req, res) => {
  fetch('https://pomber.github.io/covid19/timeseries.json')
    .then(response => response.json())
    .then(data => {
      
    })
};

module.exports = {
  getTime
};