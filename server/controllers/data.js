const fetch = require('node-fetch');  // import node-fetch module for a node.js version of frontend fetch API

// call third party API for ALL the general data (cases, deaths, recovered, updated, active, affectedCountries)
const getAll = (req, res) => {
  fetch('https://corona.lmao.ninja/v2/all')
    .then(response => response.json())
    .then(data => {
      return res.send(data);
    })
    .catch(err => console.log(`Error found: ${err}`));
};

// data for specific country
const getCountry = (req, res) => {
  const country = req.params.country;
  fetch(`https://corona.lmao.ninja/v2/countries/${country}`)
    .then(response => response.json())
    .then(data => {
      return res.send(data);
    })
    .catch(err => console.log(`Error found: ${err}`));
};

// data for ALL countries in one array of objects
const getAllCountries = (req, res) => {
  fetch('https://corona.lmao.ninja/v2/countries?sort=country')
    .then(response => response.json())
    .then(data => {
      return res.send(data);
    })
    .catch(err => console.log(`Error found: ${err}`));
};

module.exports = {
  getAll,
  getCountry,
  getAllCountries
};