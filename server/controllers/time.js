const fetch = require('node-fetch');

// call third party API for time series data
const getTime = (req, res) => {
  fetch('https://pomber.github.io/covid19/timeseries.json')
    .then(response => response.json())
    .then(data => {
      // decide if data storage/processing done in backend/frontend
      const timeSeries = [];  // array of objects with time series data

      // country is case sensitive - make sure only first letter capitalized
      const country = req.params.country[0].toUpperCase() + req.params.country.slice(1).toLowerCase();
      console.log(country);

      data[country].forEach(({ date, confirmed, recovered, deaths }) => {
        timeSeries.push({ date, confirmed, recovered, deaths });
      });
      // console.log(timeSeries);
      return res.send(timeSeries);
    })
    .catch(err => {
      console.log(`Error found: ${err}`);
      return;
    });
};

// const getTimeCountry (to be implemented?)

module.exports = {
  getTime
};