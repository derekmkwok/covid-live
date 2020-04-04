import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import CircularProgress from '@material-ui/core/CircularProgress';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';

// Font-Awesome imports
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFlag } from '@fortawesome/free-solid-svg-icons';
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
  notchedOutline: {
    borderColor: 'orange'
  },
  label: {
    color: 'orange',
    "&.Mui-focused": {
      color: "orange"
    }
  },
  focus: {
    borderColor: '#6495ED',
  },
  outlinedInput: {
    '&$focus $notchedOutline': {
      borderColor: 'orange',
      color: 'orange'
    },
    "&:hover:not($disabled):not($focused):not($error) $notchedOutline": {
      borderColor: 'orange'
    }
  },
  table: {
    minWidth: 650,
    backgroundColor: '#282c34',
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
  const [allLoaded, setAllLoaded] = useState(false);

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
        setAllLoaded(true);
      })
      .catch(err => {
        console.log('Error fetching data');
      });
  }, []);

  // re-rendering for every country change
  useEffect(() => {
    // fetch(`${root}/all`)
    fetch(`http://localhost:5000/country/${country}`)
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
    .catch(err => {
      setLoaded(false);
      console.log('Error fetching data');
    });
  }, [country]);

  const handleChange = (event) => {
    setCountry(event.target.value); // setCountry is asnyc, triggers re-render, use useEffect for render changes
  };

  // const handleSubmit = (event) => {
  //   setCountry(event.target.value); // setCountry is asnyc, triggers re-render, use useEffect for render changes
  // };

  // TO DO: BETTER STYLING

  return (
    <div>
      <main className={classes.content}>
        <div className={classes.toolbar} />
        <Typography paragraph variant='h4' style={{color: '#ADD8E6', textDecoration: 'underline', margin: 'auto', fontWeight: 'bold'}}>
          <FontAwesomeIcon icon={faGlobeAmericas} size='1x' style={{ marginRight: '20px' }}></FontAwesomeIcon>
            Worldwide Statistics
          <FontAwesomeIcon icon={faChartLine} size='1x' style={{ marginLeft: '20px' }}></FontAwesomeIcon>
        </Typography>
        <br></br>
        <TableContainer component={Paper} style={{borderColor:'#B0C4DE'}}>
          <Table style={{border: '1px solid #B0C4DE'}} className={classes.table} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell align='center' style={{color:'#B0C4DE', border:'1px solid #B0C4DE', fontSize:'18px', fontWeight:'bold'}}>
                  Cases
                </TableCell>
                <TableCell align='center' style={{color:'#B0C4DE', border:'1px solid #B0C4DE', fontSize:'18px', fontWeight:'bold'}}>
                  Deaths
                </TableCell>
                <TableCell align='center' style={{color:'#B0C4DE', border:'1px solid #B0C4DE', fontSize:'18px', fontWeight:'bold'}}>
                  Recovered
                </TableCell>
                <TableCell align='center' style={{color:'#B0C4DE', border:'1px solid #B0C4DE', fontSize:'18px', fontWeight:'bold'}}>
                  Active
                </TableCell>
                <TableCell align='center' style={{color:'#B0C4DE', border:'1px solid #B0C4DE', fontSize:'18px', fontWeight:'bold'}}>
                  Countries Affected
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow>
                <TableCell align='center' style={{color:'#FFA500', border:'1px solid #B0C4DE', fontSize:'18px', fontWeight:'bold'}}>
                  {allLoaded ? allCases : <CircularProgress color='secondary' />}
                </TableCell>
                <TableCell align='center' style={{color:'red', border:'1px solid #B0C4DE', fontSize:'18px', fontWeight:'bold'}}>
                  {allLoaded ? allDeaths : <CircularProgress color='secondary' />}
                </TableCell>
                <TableCell align='center' style={{color:'#228B22', border:'1px solid #B0C4DE', fontSize:'18px', fontWeight:'bold'}}>
                  {allLoaded ? allRecovered : <CircularProgress color='secondary' />}
                </TableCell>
                <TableCell align='center' style={{color:'#FFFF00', border:'1px solid #B0C4DE', fontSize:'18px', fontWeight:'bold'}}>
                  {allLoaded ? allActive : <CircularProgress color='secondary' />}
                </TableCell>
                <TableCell align='center' style={{color:'#A9A9A9', border:'1px solid #B0C4DE', fontSize:'18px', fontWeight:'bold'}}>
                  {allLoaded ? allCountries : <CircularProgress color='secondary' />}
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
        <br></br><br></br><br></br><br></br>
        <Typography paragraph variant='h4' style={{color: '#ADD8E6', textDecoration: 'underline', margin: 'auto', fontWeight: 'bold'}}>
          <FontAwesomeIcon icon={faFlag} size='1x' style={{ marginRight: '20px' }}></FontAwesomeIcon>
            Country Statistics
          <FontAwesomeIcon icon={faChartLine} size='1x' style={{ marginLeft: '20px' }}></FontAwesomeIcon>
        </Typography>
        <br></br>
        <Typography paragraph variant='h6' style={{color: '#6495ED'}}>
          Enter the name of a country below to get more information:
        </Typography>
        <form className={classes.root} noValidate autoComplete="off">
          <TextField 
            id="outlined-basic" 
            label="Enter Country Here" 
            onChange={handleChange} 
            // onSubmit={handleSubmit}
            variant="outlined" 
            InputLabelProps={{
              classes: {
                root: classes.label,
                focused: classes.focus,
              },
            }}
            InputProps={{
              style: {color: '#6495ED'},
              classes: {
                root: classes.outlinedInput,
                focused: classes.focus,
                notchedOutline: classes.notchedOutline
              }
            }} 
          />
          {/* <Button
            type="submit"
            variant="outlined"
            color="primary"
            className={classes.button}
          >
            Search
          </Button> */}
          {/* { !loaded ? <CircularProgress style={{ marginLeft: '25px', marginTop: '6px'}} /> : ''} */}
        </form>
        <br></br>
        <TableContainer component={Paper} style={{borderColor:'#B0C4DE'}}>
          <Table style={{border: '1px solid #B0C4DE'}} className={classes.table} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell align='center' style={{color:'#B0C4DE', border:'1px solid #B0C4DE', fontSize:'18px', fontWeight:'bold'}}>
                  Cases
                </TableCell>
                <TableCell align='center' style={{color:'#B0C4DE', border:'1px solid #B0C4DE', fontSize:'18px', fontWeight:'bold'}}>
                  Deaths
                </TableCell>
                <TableCell align='center' style={{color:'#B0C4DE', border:'1px solid #B0C4DE', fontSize:'18px', fontWeight:'bold'}}>
                  Recovered
                </TableCell>
                <TableCell align='center' style={{color:'#B0C4DE', border:'1px solid #B0C4DE', fontSize:'18px', fontWeight:'bold'}}>
                  Active
                </TableCell>
                <TableCell align='center' style={{color:'#B0C4DE', border:'1px solid #B0C4DE', fontSize:'18px', fontWeight:'bold'}}>
                  Cases Today
                </TableCell>
                <TableCell align='center' style={{color:'#B0C4DE', border:'1px solid #B0C4DE', fontSize:'18px', fontWeight:'bold'}}>
                  Deaths Today
                </TableCell>
                <TableCell align='center' style={{color:'#B0C4DE', border:'1px solid #B0C4DE', fontSize:'18px', fontWeight:'bold'}}>
                  Critical Condition
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow>
                <TableCell align='center' style={{color:'#FFA500', border:'1px solid #B0C4DE', fontSize:'18px', fontWeight:'bold'}}>
                  {loaded ? cases : <CircularProgress color='secondary' />}
                </TableCell>
                <TableCell align='center' style={{color:'red', border:'1px solid #B0C4DE', fontSize:'18px', fontWeight:'bold'}}>
                  {loaded ? deaths : <CircularProgress color='secondary' />}
                </TableCell>
                <TableCell align='center' style={{color:'#228B22', border:'1px solid #B0C4DE', fontSize:'18px', fontWeight:'bold'}}>
                  {loaded ? recovered : <CircularProgress color='secondary' />}
                </TableCell>
                <TableCell align='center' style={{color:'#FFFF00', border:'1px solid #B0C4DE', fontSize:'18px', fontWeight:'bold'}}>
                  {loaded ? active : <CircularProgress color='secondary' />}
                </TableCell>
                <TableCell align='center' style={{color:'#FFA500', border:'1px solid #B0C4DE', fontSize:'18px', fontWeight:'bold'}}>
                  {loaded ? today : <CircularProgress color='secondary' />}
                </TableCell>
                <TableCell align='center' style={{color:'red', border:'1px solid #B0C4DE', fontSize:'18px', fontWeight:'bold'}}>
                  {loaded ? todayDeaths : <CircularProgress color='secondary' />}
                </TableCell>
                <TableCell align='center' style={{color:'#FF6347', border:'1px solid #B0C4DE', fontSize:'18px', fontWeight:'bold'}}>
                  {loaded ? critical : <CircularProgress color='secondary' />}
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </main>
    </div>
  );
}