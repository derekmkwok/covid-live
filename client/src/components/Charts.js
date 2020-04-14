import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import CircularProgress from '@material-ui/core/CircularProgress';
import Button from '@material-ui/core/Button';
import SearchIcon from '@material-ui/icons/Search';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';

// Font-Awesome imports
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChartLine } from '@fortawesome/free-solid-svg-icons';

// recharts import
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

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

const root = window.location.protocol + '//' + window.location.host;  // URL for web app

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

export default function Charts() {
  const classes = useStyles();

  // hooks
  const [country, setCountry] = useState('');
  const [legend, setLegend] = useState('canada');  // country name legend will use
  const [allData, setAllData] = useState([]);
  const [cache, setCache] = useState({});  // local cache to store arrays of time series data
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [openError, setOpenError] = useState(false);
  const [openWarning, setOpenWarning] = useState(false);
  const [openLoad, setOpenLoad] = useState(false);
  const [openCountry, setOpenCountry] = useState(false);

  // initial render, fetch all the data
  useEffect(() => {
    setOpenLoad(true);
    setLoading(true);
    // fetch(`${root}/all`)
    fetch(`http://localhost:5000/time`)
      .then(response => response.json())
      .then(data => {
        setOpenLoad(false);
        if (data !== undefined || data !== null) {
          setCache(data);
          setAllData(data['canada']);  // have Canada be default (initial) display for charts
          setLoading(false);
        } else {
          setLoading(false);
          setOpenError(true);
        }
      })
      .then(() => setOpen(true))
      .catch(err => {
        setLoading(false);
        setOpenLoad(false);
        setOpenError(true);
        console.log('Error fetching data');
      });
  }, []);

  const handleChange = (event) => {
    let search = event.target.value.toLowerCase();
    // manually changing search to key names in the time series data object
    switch (search) {
      case ('usa'):
        search = 'us';
        break;
      case ('united states'):
        search = 'us';
        break;
      case ('united states of america'):
        search = 'us';
        break;
      case('uk'):
        search = 'united kingdom';
        break;
      case('uae'):
        search = 'united arab emirates';
        break;
      case('korea'):
        search = 'korea, south';
        break;
      case('south korea'):
        search = 'korea, south';
        break;
      case('taiwan'):
        search = 'taiwan*';
        break;
      default:
        // if not any of cases, no change to search
    }
    setCountry(search); // setCountry is asnyc, triggers re-render, use useEffect for render changes
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (cache[country] !== undefined) {
      // exists in cache - use cached data
      setAllData(cache[country]);
      setLegend(country);
      setOpenCountry(true);
    } else {
      console.log('not in cache');
      setOpenWarning(true);
      // setLoading(false);
    }
  };

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
    setOpenError(false);
    setOpenWarning(false);
    setOpenLoad(false);
    setOpenCountry(false);
  };

  ///////////// TO DO: ADD SNACK BAR POPUPS ///////////////////

  // testing if data really was received and changed state of data
  // const onClick = (event) => {
  //   console.log(allData);
  //   console.log(cache);
  //   console.log(country);
  //   console.log(Object.keys(cache));
  // };

  return (
    <div>
      <main className={classes.content}>
        <div className={classes.toolbar} />
        {/* <button onClick={onClick}>TEST CONSOLE LOG BUTTON</button> */}
        <Typography paragraph variant='h4' style={{color: 'orange', fontWeight: 'bold', marginBottom: '-5px'}}>
            Statistics Visualized
          <FontAwesomeIcon icon={faChartLine} size='1x' style={{ marginLeft: '20px' }}></FontAwesomeIcon>
        </Typography>
        <br></br> 
        <form className={classes.root} noValidate autoComplete="off" onSubmit={handleSubmit} style={{marginBottom:'25px'}}>
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
          <Button variant="outlined" color="secondary" type='submit' disabled={loading} style={{marginLeft:'25px'}} endIcon={<SearchIcon />}>
            Search
          </Button>
          <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
            <Alert onClose={handleClose} severity="success">
              Data Successfully Loaded
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
          <Snackbar open={openCountry} autoHideDuration={6000} onClose={handleClose}>
            <Alert onClose={handleClose} severity="success">
              Country Found: Plotting Data...
            </Alert>
          </Snackbar>
          { loading ? <CircularProgress disableShrink color='secondary' style={{ marginLeft: '25px', marginTop: '6px'}} /> : ''}
        </form>
        <br></br>
        { Object.keys(allData).length !== 0 ? 
          <React.Fragment>
            <LineChart
              width={800}
              height={500}
              data={allData}
              style={{marginBottom:'50px'}}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis tick={{fill:'#F8F8FF'}} dataKey="date">
                {/* <Label value="Date" offset={0} position="bottom" style={{ fill:'#F8F8FF' }} /> */}
              </XAxis>
              <YAxis tick={{fill:'#F8F8FF'}} />
              <Tooltip />
              <Legend verticalAlign='top' formatter={(value, entry, index) => {
                return <span style={{ color:'#F8F8FF', fontSize:'16px' }}>{value.toUpperCase()} CASES IN {legend.toUpperCase()}</span>}
              } />
              <Line type="monotone" dataKey="confirmed" stroke="#FFA500" activeDot={{ r: 5 }} />
            </LineChart>
          </React.Fragment>
        : '' }
        { Object.keys(allData).length !== 0 ? 
          <React.Fragment>
            <LineChart
              width={800}
              height={500}
              data={allData}
              style={{marginBottom:'50px'}}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis tick={{fill:'#F8F8FF'}} dataKey="date" />
              <YAxis tick={{fill:'#F8F8FF'}} />
              <Tooltip />
              <Legend verticalAlign='top' formatter={(value, entry, index) => {
                return <span style={{ color:'#F8F8FF', fontSize:'16px' }}>{value.toUpperCase()} CASES IN {legend.toUpperCase()}</span>}
              } />
              <Line type="monotone" dataKey="recovered" stroke="#228B22" activeDot={{ r: 5 }} />
            </LineChart>
          </React.Fragment>
        : '' }
        { Object.keys(allData).length !== 0 ? 
          <React.Fragment>
            <LineChart
              width={800}
              height={500}
              data={allData}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis tick={{fill:'#F8F8FF'}} dataKey="date" />
              <YAxis tick={{fill:'#F8F8FF'}} />
              <Tooltip />
              <Legend verticalAlign='top' formatter={(value, entry, index) => {
                return <span style={{ color:'#F8F8FF', fontSize:'16px' }}>{value.toUpperCase()} IN {legend.toUpperCase()}</span>}
              } />
              <Line type="monotone" dataKey="deaths" stroke="red" activeDot={{ r: 5 }} />
            </LineChart>
          </React.Fragment>
        : '' }
      </main>
    </div>
  );
}