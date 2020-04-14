# COVID-19 Live Data Tracker App

## Technologies
* Heroku - Deployed to the Heroku cloud platform at https://covidlivetrack.herokuapp.com/
* React
* Node
* Express
* Postman
* API for current cases at https://corona.lmao.ninja/ - credits to the team at https://github.com/NovelCOVID/API
* API for time series data at https://pomber.github.io/covid19/timeseries.json - credits to the team at https://github.com/pomber/covid19

## What is this?
* A web application that tracks live updates of COVID-19/Coronavirus data
* Node-Express used for the backend portion for logic and data processing after making API calls
* React used for the frontend portion of this application
* UI styled with Material-UI and Font Awesome Icons
* Postman tool utilized for testing API calls
* Features:
  * Data regarding all cases
  * Data filtered by country
  * Time series data visualized
  * Information/resources regarding COVID-19 and where/how to seek help

## Future Implementations
* Dropdown as people search for countries
* Update styling - font, consistent table size
* Charts with total world data
* Make snackbar show full country name when searching with abbreviation
* Consistent country searching between cases and charts page