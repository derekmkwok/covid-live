import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import CircularProgress from '@material-ui/core/CircularProgress';

// Font-Awesome imports
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGlobeAmericas } from '@fortawesome/free-solid-svg-icons';
import { faChartLine } from '@fortawesome/free-solid-svg-icons';
import { faLaptopHouse} from '@fortawesome/free-solid-svg-icons';

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

  // TO DO UPDATE HOME PAGE, MOVED STATS TO CASES PAGE, ADD ABOUT?

  return (
    <div>
      <main className={classes.content}>
        <div className={classes.toolbar} />
        <Typography paragraph variant='h3' style={{color: '#ADD8E6', margin: 'auto', fontWeight: 'bold'}}>
          Welcome!
          <FontAwesomeIcon icon={faLaptopHouse} size='1x' style={{ marginLeft: '20px' }}></FontAwesomeIcon>
        </Typography>
        <br></br>
        <Typography paragraph variant='h6' style={{color: '#6495ED'}}>
          The navigation bar can be found on the left.<br></br>Please select:
        </Typography>
        <Typography paragraph variant='h6' style={{color: '#B0C4DE'}}>
          <b>Cases</b> - COVID-19 statistics worldwide or filtered by country
        </Typography>
        <Typography paragraph variant='h6' style={{color: '#B0C4DE'}}>
          <b>Charts</b> - Visualized charts/graphs of COVID-19 data
        </Typography>
        <Typography paragraph variant='h6' style={{color: '#B0C4DE'}}>
          <b>Information</b> - Resources and information regarding COVID-19
        </Typography>
      </main>
    </div>
  );
}