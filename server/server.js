const express = require('express');
const path = require('path');

// process.env variables for private variables
// require('dotenv').config();

// middleware
const cors = require('cors');  // cross origin resource sharing to allow for different origins to communicate
const helmet = require('helmet');  // security
const morgan = require('morgan');  // logging

// controllers
const data = require('./controllers/data');
const time = require('./controllers/time');

const app = express();
const frontendPort = 3000;

app.use(cors({ origin: `http://localhost:${frontendPort}` }));  // cross origin resource sharing
app.use(helmet());  // security for headers
app.use(morgan('combined'));  // logging

// react build
app.use(express.static(path.join(__dirname, 'build')));

// api routes
app.get('/all', data.getAll);
app.get('/country/all', data.getAllCountries);  // need this line above otherwise 'all' is considered a parameter
app.get('/country/:country', data.getCountry);
app.get('/time', time.getTime);
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

const backendPort = process.env.PORT || 5000;

app.listen(backendPort, () => console.log(`App running on port ${backendPort}`));