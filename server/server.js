const express = require('express');

// process.env variables for private variables
// require('dotenv').config();

// middleware
const cors = require('cors');  // cross origin resource sharing to allow for different origins to communicate
// const bodyParser = require('body-parser');  // parses requests into usable format
const helmet = require('helmet');  // security
const morgan = require('morgan');  // logging

// controllers
const data = require('./controllers/data');
const time = require('./controllers/time');

const app = express();
const frontendPort = 3000;

app.use(cors({ origin: `http://localhost:${frontendPort}` }));  // cross origin resource sharing
// app.use(bodyParser.json());
app.use(helmet());  // security for headers
app.use(morgan('combined'));  // logging

// api routes
app.get('/', (req, res) => res.send('Hello World!'));
app.get('/all', data.getAll);
app.get('/country/all', data.getAllCountries);  // need this line above otherwise 'all' is considered a parameter
app.get('/country/:country', data.getCountry);
app.get('/time/:country', time.getTime);

const backendPort = process.env.PORT || 5000;

app.listen(backendPort, () => console.log(`App running on port ${backendPort} - http://localhost:${backendPort}`));