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
import SearchIcon from '@material-ui/icons/Search';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';

// Font-Awesome imports
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFlag } from '@fortawesome/free-solid-svg-icons';
import { faGlobeAmericas } from '@fortawesome/free-solid-svg-icons';

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
  toolbar: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    backgroundColor: '#282c34',
    padding: theme.spacing(3),
    height: '100%'
  },
  notchedOutline: {
    borderColor: '#3399ff'
  },
  label: {
    color: '#3399ff',
    "&.Mui-focused": {
      color: "#3399ff"
    }
  },
  focus: {
    borderColor: '#3399ff',
  },
  outlinedInput: {
    '&$focus $notchedOutline': {
      borderColor: '#3399ff',
      color: '#3399ff'
    },
    "&:hover:not($disabled):not($focused):not($error) $notchedOutline": {
      borderColor: '#3399ff'
    }
  },
  table: {
    minWidth: 650,
    backgroundColor: '#282c34',
  },
}));

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

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

  // snackbar hooks
  const [open, setOpen] = useState(false);
  const [openError, setOpenError] = useState(false);
  const [openWarning, setOpenWarning] = useState(false);
  const [openLoad, setOpenLoad] = useState(false);
  const [snackCountry, setSnackCountry] = useState('world');

  // initial render
  useEffect(() => {
    setOpen(false);
    setOpenError(false);
    setOpenWarning(false);
    setOpenLoad(true);
    setLoading(true);
    fetch(`/all`)
      .then(response => response.json())
      .then(data => {
        setAllData(data);
        setAllLoaded(true);
      })
      .catch(err => {
        // console.log('Error fetching data');
      });
    fetch(`/country/${country}`)
      .then(response => response.json())
      .then(data => {
        setOpenLoad(false);
        // if country data exists, set all values
        if (!(data === undefined || data === null)) {
          setCountryData(data);
          data['cases'] === undefined ? setOpenWarning(true) : setOpen(true);
          setCache(prev => {
            return {...prev, [country.toLowerCase()]:data};
          });
          setLoading(false);
        } else {
          setOpenError(true);
          setLoading(false);
        }
      })
      .catch(err => {
        setOpenLoad(false);
        setOpenError(true);
        setLoading(false);
        // console.log('Error fetching data');
      });
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    // console.log(country);
    // console.log(cache);
    if (cache[country.toLowerCase()] !== undefined) {
      setOpen(false);
      setOpenError(false);
      setOpenWarning(false);
      setOpenLoad(false);
      cache[country.toLowerCase()]['cases'] === undefined ? setOpenWarning(true) : setOpen(true);
      setSnackCountry(country);
      setCountryData(cache[country.toLowerCase()]);
    } else {
      setOpen(false);
      setOpenError(false);
      setOpenWarning(false);
      setOpenLoad(true);
      setLoading(true);
      fetch(`/country/${country}`)
        .then(response => response.json())
        .then(data => {
          setOpenLoad(false);
          // if country data exists, set all values
          if (!(data === undefined || data === null)) {
            setCountryData(data);
            setSnackCountry(country);
            data['cases'] === undefined ? setOpenWarning(true) : setOpen(true);
            setCache(prev => {
              return {...prev, [country.toLowerCase()]:data};
            });
            setLoading(false);
          } else {
            setOpenError(true);
            setLoading(false);
          }
        })
        .catch(err => {
          setOpenLoad(false);
          setOpenError(true);
          setLoading(false);
          // console.log('Error fetching data');
        });
    }
  };

  const handleChange = (event) => {
    let search = event.target.value.toLowerCase();
    if (search === '') {
      // set default search to world if empty string search
      search = 'world';
    }
    setCountry(search); // setCountry is asnyc, triggers re-render, use useEffect for render changes
  };

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
    setOpenError(false);
    setOpenWarning(false);
    setOpenLoad(false);
  };

  return (
    <div>
      <main className={classes.content}>
        <div className={classes.toolbar} />
        <Typography paragraph variant='h4' style={{color: 'orange', fontWeight: 'bold', marginBottom: '-5px'}}>
            Worldwide Statistics
            <FontAwesomeIcon icon={faGlobeAmericas} size='1x' style={{ marginLeft: '20px' }}></FontAwesomeIcon>
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
                  {allLoaded ? allData['cases'] : <CircularProgress disableShrink color='secondary' />}
                </TableCell>
                <TableCell align='center' style={{color:'red', border:'1px solid #B0C4DE', fontSize:'18px', fontWeight:'bold'}}>
                  {allLoaded ? allData['deaths'] : <CircularProgress disableShrink color='secondary' />}
                </TableCell>
                <TableCell align='center' style={{color:'#228B22', border:'1px solid #B0C4DE', fontSize:'18px', fontWeight:'bold'}}>
                  {allLoaded ? allData['recovered'] : <CircularProgress disableShrink color='secondary' />}
                </TableCell>
                <TableCell align='center' style={{color:'#FFFF00', border:'1px solid #B0C4DE', fontSize:'18px', fontWeight:'bold'}}>
                  {allLoaded ? allData['active'] : <CircularProgress disableShrink color='secondary' />}
                </TableCell>
                <TableCell align='center' style={{color:'#A9A9A9', border:'1px solid #B0C4DE', fontSize:'18px', fontWeight:'bold'}}>
                  {allLoaded ? allData['affectedCountries'] : <CircularProgress disableShrink color='secondary' />}
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
        <br></br><br></br><br></br><br></br>
        <Typography paragraph variant='h4' style={{color: 'orange', marginBottom: '-5px', fontWeight: 'bold'}}>
            Country Statistics
            <FontAwesomeIcon icon={faFlag} size='1x' style={{ marginLeft: '20px' }}></FontAwesomeIcon>
        </Typography>
        <br></br>
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
          <Button variant="outlined" color="secondary" type='submit' style={{marginLeft:'25px'}} endIcon={<SearchIcon />}>
            Search
          </Button>
          <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
            <Alert onClose={handleClose} severity="success">
              Data Successfully Loaded: {snackCountry.toUpperCase()}
            </Alert>
          </Snackbar>
          <Snackbar open={openError} autoHideDuration={6000} onClose={handleClose}>
            <Alert onClose={handleClose} severity="error">
              Error: Data Unable to Load
            </Alert>
          </Snackbar>
          <Snackbar open={openWarning} autoHideDuration={6000} onClose={handleClose}>
            <Alert onClose={handleClose} severity="warning">
              Country Not Found
            </Alert>
          </Snackbar>
          <Snackbar open={openLoad} autoHideDuration={6000} onClose={handleClose}>
            <Alert onClose={handleClose} severity="info">
              Data Loading...
            </Alert>
          </Snackbar>
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