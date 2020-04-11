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
    borderColor: '#6495ED'
  },
  label: {
    color: '#6495ED',
    "&.Mui-focused": {
      color: "#6495ED"
    }
  },
  focus: {
    borderColor: '#6495ED',
  },
  outlinedInput: {
    '&$focus $notchedOutline': {
      borderColor: '#6495ED',
      color: '#6495ED'
    },
    "&:hover:not($disabled):not($focused):not($error) $notchedOutline": {
      borderColor: '#6495ED'
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
  const [allData, setAllData] = useState({})
  const [allLoaded, setAllLoaded] = useState(false);

  // country hooks
  const [country, setCountry] = useState('world');
  const [countryData, setCountryData] = useState({});
  const [loading, setLoading] = useState(false);

  // caching data to component
  const [cache, setCache] = useState({})

  // initial render
  useEffect(() => {
    // fetch(`${root}/all`)
    fetch(`http://localhost:5000/all`)
      .then(response => response.json())
      .then(data => {
        setAllData(data);
        setAllLoaded(true);
      })
      .catch(err => {
        console.log('Error fetching data');
      });
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    // fetch(`${root}/all`)
    console.log(cache);
    if (cache[country.toLowerCase()] !== undefined) {
      setCountryData(cache[country.toLowerCase()]);
    } else {
      setLoading(true);
      fetch(`http://localhost:5000/country/${country}`)
      .then(response => response.json())
      .then(data => {
        // if country data exists, set all values
        if (!(data === undefined || data === null)) {
          setCountryData(data);
          setCache(prev => {
            return {...prev, [country.toLowerCase()]:data};
          });
          setLoading(false);
        } else {
          setLoading(false);
        }
      })
      .catch(err => {
        setLoading(false);
        console.log('Error fetching data');
      });
    }
  };

  const handleChange = (event) => {
    setCountry(event.target.value.toLowerCase()); // setCountry is asnyc, triggers re-render, use useEffect for render changes
  };

  ///////////// TO DO: ADD SNACK BAR POPUPS ///////////////////

  return (
    <div>
      <main className={classes.content}>
        <div className={classes.toolbar} />
        <Typography paragraph variant='h4' style={{color: 'orange', textDecoration: 'underline', margin: 'auto', fontWeight: 'bold'}}>
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
                  {allLoaded ? allData['cases'] : <CircularProgress color='secondary' />}
                </TableCell>
                <TableCell align='center' style={{color:'red', border:'1px solid #B0C4DE', fontSize:'18px', fontWeight:'bold'}}>
                  {allLoaded ? allData['deaths'] : <CircularProgress color='secondary' />}
                </TableCell>
                <TableCell align='center' style={{color:'#228B22', border:'1px solid #B0C4DE', fontSize:'18px', fontWeight:'bold'}}>
                  {allLoaded ? allData['recovered'] : <CircularProgress color='secondary' />}
                </TableCell>
                <TableCell align='center' style={{color:'#FFFF00', border:'1px solid #B0C4DE', fontSize:'18px', fontWeight:'bold'}}>
                  {allLoaded ? allData['active'] : <CircularProgress color='secondary' />}
                </TableCell>
                <TableCell align='center' style={{color:'#A9A9A9', border:'1px solid #B0C4DE', fontSize:'18px', fontWeight:'bold'}}>
                  {allLoaded ? allData['affectedCountries'] : <CircularProgress color='secondary' />}
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
        <br></br><br></br><br></br><br></br>
        <Typography paragraph variant='h4' style={{color: 'orange', textDecoration: 'underline', margin: 'auto', fontWeight: 'bold'}}>
          <FontAwesomeIcon icon={faFlag} size='1x' style={{ marginRight: '20px' }}></FontAwesomeIcon>
            Country Statistics
          <FontAwesomeIcon icon={faChartLine} size='1x' style={{ marginLeft: '20px' }}></FontAwesomeIcon>
        </Typography>
        <br></br>
        <Typography paragraph variant='h6' style={{color: '#3399ff'}}>
          Enter the name of a country below (or enter world):
        </Typography>
        <form className={classes.root} noValidate autoComplete="off" onSubmit={handleSubmit}>
          <TextField 
            id="outlined-basic" 
            label="Enter Country Here" 
            onChange={handleChange} 
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
          <Button variant="outlined" color="primary" type='submit'>
            Search
          </Button>
          { loading ? <CircularProgress disableShrink color='secondary' style={{ marginLeft: '25px', marginTop: '6px'}} /> : ''}
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
                  {!loading ? countryData['cases'] : ''}
                </TableCell>
                <TableCell align='center' style={{color:'red', border:'1px solid #B0C4DE', fontSize:'18px', fontWeight:'bold'}}>
                  {!loading ? countryData['deaths'] : ''}
                </TableCell>
                <TableCell align='center' style={{color:'#228B22', border:'1px solid #B0C4DE', fontSize:'18px', fontWeight:'bold'}}>
                  {!loading ? countryData['recovered'] : ''}
                </TableCell>
                <TableCell align='center' style={{color:'#FFFF00', border:'1px solid #B0C4DE', fontSize:'18px', fontWeight:'bold'}}>
                  {!loading ? countryData['active'] : ''}
                </TableCell>
                <TableCell align='center' style={{color:'#FFA500', border:'1px solid #B0C4DE', fontSize:'18px', fontWeight:'bold'}}>
                  {!loading ? countryData['todayCases'] : ''}
                </TableCell>
                <TableCell align='center' style={{color:'red', border:'1px solid #B0C4DE', fontSize:'18px', fontWeight:'bold'}}>
                  {!loading ? countryData['todayDeaths'] : ''}
                </TableCell>
                <TableCell align='center' style={{color:'#FF6347', border:'1px solid #B0C4DE', fontSize:'18px', fontWeight:'bold'}}>
                  {!loading ? countryData['critical'] : ''}
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </main>
    </div>
  );
}