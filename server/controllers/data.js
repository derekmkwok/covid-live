const fetch = require('node-fetch');  // import node-fetch module for a node.js version of frontend fetch API

// call third party API for ALL the general data (cases, deaths, recovered, updated, active, affectedCountries)
const getAll = (req, res) => {
  fetch('https://corona.lmao.ninja/all')
    .then(response => response.json())
    .then(data => {
      console.log(data);
      return res.send(data);
    })
    .catch(err => console.log(`Error found: ${err}`));
};

// data for specific country
const getCountry = (req, res) => {
  const country = req.params.country;
  console.log(country);
  fetch(`https://corona.lmao.ninja/countries/${country}`)
    .then(response => response.json())
    .then(data => {
      console.log(data);
      return res.send(data);
    })
    .catch(err => console.log(`Error found: ${err}`));
};

// data for ALL countries in one array of objects
const getAllCountries = (req, res) => {
  fetch('https://corona.lmao.ninja/countries?sort=country')
    .then(response => response.json())
    .then(data => {
      // try caching all countries - similar to charts page?
      // const canada = data.find(obj => obj['country'] === "Canada");  // example: fetching one country from array
      // console.log(canada);
      // // console.log(data);
      return res.send(data);
    })
    .catch(err => console.log(`Error found: ${err}`));
};

module.exports = {
  getAll,
  getCountry,
  getAllCountries
};