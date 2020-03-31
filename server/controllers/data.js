const fetch = require('node-fetch');

const getAll = (req, res) => {
  fetch('https://corona.lmao.ninja/all')
    .then(response => response.json())
    .then(data => {
      // console.log(data);
      res.send(data);
      // res.send(console.log(data));
      // console.log(data);
    })
    .catch(err => console.log(`Error found: ${err}`))
};

module.exports = {
  getAll
};