const fetch = require('node-fetch');  // import node-fetch module for a node.js version of frontend fetch API

// call third party API for ALL the general data (cases, deaths, recovered, updated, active, affectedCountries)
const getAll = (req, res) => {
  fetch('https://corona.lmao.ninja/all')
    .then(response => response.json())
    .then(data => {
      // can manipulate data as needed here before sending it back as response
      console.log(data);
      res.send(data);
    })
    .catch(err => console.log(`Error found: ${err}`))
};

const getCountry = (req, res) => {
  const country = req.params.country;
  console.log(country);
  fetch(`https://corona.lmao.ninja/countries/${country}`)
    .then(response => response.json())
    .then(data => {
      // can manipulate data as needed here before sending it back as response
      console.log(data);
      res.send(data);
    })
    .catch(err => console.log(`Error found: ${err}`))
};

const getAllCountries = (req, res) => {
  console.log('asdf');
  fetch('https://corona.lmao.ninja/countries?sort=country')
    .then(response => response.json())
    .then(data => {
      // can manipulate data as needed here before sending it back as response
      console.log(data);
      res.send(data);
    })
    .catch(err => console.log(`Error found: ${err}`))
};

module.exports = {
  getAll,
  getCountry,
  getAllCountries
};