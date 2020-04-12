import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import CircularProgress from '@material-ui/core/CircularProgress';
import Button from '@material-ui/core/Button';
import SearchIcon from '@material-ui/icons/Search';

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

export default function Charts() {
  const classes = useStyles();

  // hooks
  const [country, setCountry] = useState('');
  const [allData, setAllData] = useState([]);
  const [cache, setCache] = useState({});  // local cache to store arrays of time series data
  const [loading, setLoading] = useState(false);

  // initial render, fetch all the data
  useEffect(() => {
    setLoading(true);
     // fetch(`${root}/all`)
     fetch(`http://localhost:5000/time`)
     .then(response => response.json())
     .then(data => {
       if (data !== undefined || data !== null) {
         // setAllData(prev => [...prev,...data]);
         setCache(data);
         // store data in cache
        //  setCache(prev => {
        //    return {...prev, [country]:data}
        //  });
         // setAllData(allData.concat(data));
         // setAllLoaded(true);
         console.log(data);
         setLoading(false);
       } else {
         setLoading(false);
       }
     })
     .then(() => console.log(allData))
     .catch(err => {
       setLoading(false);
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
    }
    setCountry(search); // setCountry is asnyc, triggers re-render, use useEffect for render changes
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (cache[country] !== undefined) {
      // exists in cache - use cached data
      setAllData(cache[country]);
    } else {
      console.log('not in cache');
      setLoading(false);
    }
  };

  ///////////// TO DO: ADD SNACK BAR POPUPS ///////////////////

  // testing if data really was received and changed state of data
  const onClick = (event) => {
    console.log(allData);
    console.log(cache);
    console.log(country);
    console.log(Object.keys(cache));
  };

  return (
    <div>
      <main className={classes.content}>
        <div className={classes.toolbar} />
        <button onClick={onClick}>TEST CONSOLE LOG BUTTON</button>
        {/* <Typography paragraph variant='h4' style={{color: '#ADD8E6', textDecoration: 'underline', margin: 'auto', fontWeight: 'bold'}}> */}
        <Typography paragraph variant='h4' style={{color: 'orange', textDecoration: 'underline', margin: 'auto', fontWeight: 'bold'}}>
          {/* <FontAwesomeIcon icon={faFlag} size='1x' style={{ marginRight: '20px' }}></FontAwesomeIcon> */}
            Statistics Visualized
          {/* <FontAwesomeIcon icon={faChartLine} size='1x' style={{ marginLeft: '20px' }}></FontAwesomeIcon> */}
        </Typography>
        <br></br> 
        {/* <Typography paragraph variant='h6' style={{color: '#3399ff'}}>
          Enter the name of a country below:
        </Typography> */}
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
          <Button variant="outlined" color="secondary" type='submit' disabled={loading} style={{marginLeft:'25px'}} endIcon={<SearchIcon />}>
            Search
          </Button>
          { loading ? <CircularProgress disableShrink color='secondary' style={{ marginLeft: '25px', marginTop: '6px'}} /> : ''}
        </form>
        <br></br>
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
              <Legend />
              <Line type="monotone" dataKey="confirmed" stroke="#FFA500" activeDot={{ r: 8 }} />
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
              <Legend />
              <Line type="monotone" dataKey="recovered" stroke="#228B22" />
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
              <Legend />
              <Line type="monotone" dataKey="deaths" stroke="red" />
            </LineChart>
          </React.Fragment>
        : '' }
      </main>
    </div>
  );
}