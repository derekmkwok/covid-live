import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import CircularProgress from '@material-ui/core/CircularProgress';

// Font-Awesome imports
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFlag } from '@fortawesome/free-solid-svg-icons';
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
  notchedOutline: {
    borderColor: '#FFF'
  },
  label: {
    color: '#FFF',
    "&.Mui-focused": {
      color: "#FFF"
    }
  },
  focus: {
    borderColor: '#FFF',
  },
  outlinedInput: {
    '&$focus $notchedOutline': {
      borderColor: '#FFF',
      color: '#FFF'
    },
    "&:hover:not($disabled):not($focused):not($error) $notchedOutline": {
      borderColor: '#FFD700'
    }
  },
}));

export default function Cases() {
  const classes = useStyles();

  // worldwide hooks
  const [allCases, setAllCases] = useState(-1);
  const [allDeaths, setAllDeaths] = useState(-1);
  const [allRecovered, setAllRecovered] = useState(-1);
  const [allActive, setAllActive] = useState(-1);
  const [allCountries, setAllCountries] = useState(-1);

  // country hooks
  const [country, setCountry] = useState('');
  const [cases, setCases] = useState(-1);  // -1 for initial state
  const [deaths, setDeaths] = useState(-1);
  const [recovered, setRecovered] = useState(-1);
  const [active, setActive] = useState(-1);
  const [today, setToday] = useState(-1);
  const [todayDeaths, setTodayDeaths] = useState(-1);
  const [critical, setCritical] = useState(-1);
  const [loaded, setLoaded] = useState(false);

  // initial render
  useEffect(() => {
    // fetch(`${root}/all`)
    fetch(`http://localhost:5000/all`)
      .then(response => response.json())
      .then(data => {
        setAllCases(data['cases']);
        setAllDeaths(data['deaths']);
        setAllRecovered(data['recovered']);
        setAllActive(data['active']);
        setAllCountries(data['affectedCountries']);
      })
      .catch(err => console.log('Error fetching data'));
  }, []);

  // re-rendering for every country change
  useEffect(() => {
    // fetch(`${root}/all`)
    let query;
    if (country.toLowerCase() === 'world') {
      query = 'all';
    } else {
      query = 'country' + '/' + country;
    }
    fetch(`http://localhost:5000/${query}`)
    .then(response => response.json())
    .then(data => {
      // if country data exists, set all values
      if (!(data['cases'] === undefined || data['cases'] === null)) {
        setCases(data['cases']);
        setDeaths(data['deaths']);
        setRecovered(data['recovered']);
        setActive(data['active']);
        setToday(data['todayCases']);
        setTodayDeaths(data['todayDeaths']);
        setCritical(data['critical']);
        setLoaded(true);
      } else {
        setLoaded(false);
      }
    })
    .then(() => {
      console.log(cases);
    })
    .catch(err => console.log('Error fetching data'));
  }, [country]);

  const handleChange = (event) => {
    // setCases(-1);
    // setDeaths(-1);
    // setRecovered(-1);
    // setActive(-1);
    // setToday(-1);
    // setTodayDeaths(-1);
    // setCritical(-1);
    setCountry(event.target.value); // setCountry is asnyc, triggers re-render, use useEffect for render changes
  };

  return (
    <div>
      <main className={classes.content}>
        <div className={classes.toolbar} />
        <Typography paragraph variant='h3' style={{color: '#B0C4DE', textDecoration: 'underline', margin: 'auto'}}>
          <FontAwesomeIcon icon={faFlag} size='1x' style={{ marginRight: '20px' }}></FontAwesomeIcon>
          Country Statistics
          <FontAwesomeIcon icon={faChartLine} size='1x' style={{ marginLeft: '20px' }}></FontAwesomeIcon>
        </Typography>
        <br></br>
        <Typography paragraph variant='h6' style={{color: '#FFF'}}>
          Enter the name of a country below to get more information
        </Typography>
        <form className={classes.root} noValidate autoComplete="off">
          <TextField 
            id="outlined-basic" 
            label="Country" 
            onChange={handleChange} 
            variant="outlined" 
            InputLabelProps={{
              classes: {
                root: classes.label,
                focused: classes.focus,
              },
            }}
            InputProps={{
              style: {color: '#FFF'},
              classes: {
                root: classes.outlinedInput,
                focused: classes.focus,
                notchedOutline: classes.notchedOutline
              }
            }} 
          />
          { !loaded ? <CircularProgress style={{ marginLeft: '25px', marginTop: '6px'}} /> : ''}
        </form>
        <br></br>
        { loaded ? 
          <React.Fragment>
            <Typography paragraph variant='h4' style={{color: '#6495ED'}}>
              Total Cases: {cases}
            </Typography>
            <Typography paragraph variant='h4' style={{color: 'red'}}>
              Deaths: {deaths}
            </Typography>
            <Typography paragraph variant='h4' style={{color: 'green'}}>
              Recovered: {recovered}
            </Typography>
            <Typography paragraph variant='h4' style={{color: 'yellow'}}>
              Active: {active}
            </Typography>
            <Typography paragraph variant='h4' style={{color: 'yellow'}}>
              Cases Today: {today}
            </Typography>
            <Typography paragraph variant='h4' style={{color: 'yellow'}}>
              Deaths Today: {todayDeaths}
            </Typography>
            <Typography paragraph variant='h4' style={{color: 'yellow'}}>
              Critical Condition: {critical}
            </Typography>
          </React.Fragment>
          :
          ''
        }
      </main>
    </div>
  );
}