const express = require('express');

// process.env variables for private variables
// require('dotenv').config();

// middleware
const cors = require('cors');  // cross origin resource sharing to allow for different origins to communicate
// const bodyParser = require('body-parser');  // parses requests into usable format
const helmet = require('helmet');  // security
const morgan = require('morgan');  // logging

const data = require('./controllers/data');

const app = express();
const frontendPort = 3000;

app.use(cors({ origin: `http://localhost:${frontendPort}` }));
// app.use(bodyParser.json());
app.use(helmet());
app.use(morgan('combined'));

app.get('/', (req, res) => res.send('Hello World!'));
// app.get('/all', (req, res) => {
//   const allData = data.getAll;
//   console.log(allData);
//   res.send(allData);
// });
app.get('/all', data.getAll);


const backendPort = 5000;

app.listen(5000, () => console.log(`App running on port ${backendPort} - http://localhost:5000`));