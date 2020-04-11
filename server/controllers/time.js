const fetch = require('node-fetch');

// call third party API for time series data
const getTime = (req, res) => {
  fetch('https://pomber.github.io/covid19/timeseries.json')
    .then(response => response.json())
    .then(data => {
      // decide if data storage/processing done in backend/frontend

      // return res.send(data);


      /////////////// ANOTHER METHOD FOR ALL LOWER CASE ////////////////////

      // return object to client side with all keys lowercased
      const keys = Object.keys(data);
      const timeSeries = {};  // empty object to store 
      for (let k of keys) {
        timeSeries[k.toLowerCase()] = data[k];  // storing a clone of the data into new object with lowercase keys
      }

      console.log(timeSeries);

      return res.send(timeSeries);

      ///////////////////////// OLD METHOD BELOW ////////////////////////////////

      // const timeSeries = [];  // array of objects with time series data

      // // country is case sensitive - make sure only first letter capitalized
      // const country = req.params.country[0].toUpperCase() + req.params.country.slice(1).toLowerCase();
      // console.log(country);

      // if (data[country] === undefined) {
      //   // to do
      //   // find a way to make it so that all the countries use lower case when selecting by key (case insensitive)
      //   console.log('not found')
      //   return res.send(null);  // return null due to no country with that name existing in database
      // } else {
      //   data[country].forEach(({ date, confirmed, recovered, deaths }) => {
      //     timeSeries.push({ date, confirmed, recovered, deaths });
      //   });
      //   // console.log(timeSeries);
      //   return res.send(timeSeries);
      // }
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