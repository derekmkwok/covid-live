import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import CircularProgress from '@material-ui/core/CircularProgress';

// Font-Awesome imports
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGlobeAmericas } from '@fortawesome/free-solid-svg-icons';
import { faChartLine } from '@fortawesome/free-solid-svg-icons';

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  appBar: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
    backgroundColor: '#424242',
  },
  // necessary for content to be below app bar
  toolbar: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    // backgroundColor: 'theme.palette.background.default',
    backgroundColor: '#282c34',
    padding: theme.spacing(3),
    height: '100%'
  },
}));

const root = window.location.protocol + '//' + window.location.host;

export default function Home() {
  const classes = useStyles();

  // Hooks
  const [cases, setCases] = useState(0);
  const [deaths, setDeaths] = useState(0);
  const [recovered, setRecovered] = useState(0);
  const [active, setActive] = useState(0);
  const [countries, setCountries] = useState(0);
 
  // TODO: Add datetime for when data is fetched and is latest?
  useEffect(() => {
    // fetch(`${root}/all`)
    fetch(`http://localhost:5000/all`)
      .then(response => response.json())
      .then(data => {
        setCases(data['cases']);
        setDeaths(data['deaths']);
        setRecovered(data['recovered']);
        setActive(data['active']);
        setCountries(data['affectedCountries']);
      })
      .catch(err => console.log('Error fetching data'));
  });

  return (
    <div>
      <main className={classes.content}>
        <div className={classes.toolbar} />
        <Typography paragraph variant='h3' style={{color: '#B0C4DE', textDecoration: 'underline', margin: 'auto'}}>
          <FontAwesomeIcon icon={faGlobeAmericas} size='1x' style={{ marginRight: '20px' }}></FontAwesomeIcon>
          Worldwide Statistics
          <FontAwesomeIcon icon={faChartLine} size='1x' style={{ marginLeft: '20px' }}></FontAwesomeIcon>
        </Typography>
        <br></br>
        <Typography paragraph variant='h4' style={{color: '#6495ED'}}>
          Total Cases: {cases !== 0 ? cases : 'Loading...'}
        </Typography>
        <Typography paragraph variant='h4' style={{color: 'red'}}>
          Deaths: {deaths !== 0 ? deaths : 'Loading...'}
        </Typography>
        <Typography paragraph variant='h4' style={{color: 'green'}}>
          Recovered: {recovered !== 0 ? recovered : 'Loading...'}
        </Typography>
        <Typography paragraph variant='h4' style={{color: 'yellow'}}>
          Active: {active !== 0 ? active : 'Loading...'}
        </Typography>
        <Typography paragraph variant='h4' style={{color: '#A9A9A9'}}>
          Countries with Active Cases: {countries !== 0 ? countries : 'Loading...'}
        </Typography>
      </main>
    </div>
  );
}