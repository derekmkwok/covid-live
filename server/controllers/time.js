const fetch = require('node-fetch');

// call third party API for time series data
const getTime = (req, res) => {
  fetch('https://pomber.github.io/covid19/timeseries.json')
    .then(response => response.json())
    .then(data => {
      // return object to client side with all keys lowercased
      const keys = Object.keys(data);
      const timeSeries = {};  // empty object to store 
      for (let k of keys) {
        timeSeries[k.toLowerCase()] = data[k];  // storing a clone of the data into new object with lowercase keys
      }
      return res.send(timeSeries);
    })
    .catch(err => {
      console.log(`Error found: ${err}`);
      return;
    });
};

module.exports = {
  getTime
};