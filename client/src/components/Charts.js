import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import CircularProgress from '@material-ui/core/CircularProgress';
import Button from '@material-ui/core/Button';

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

export default function Charts() {
  const classes = useStyles();

  // hooks
  const [country, setCountry] = useState('');
  const [allData, setAllData] = useState([]);
  const [cache, setCache] = useState({});  // local cache to store previously searched arrays of time series data
  const [loading, setLoading] = useState(false);

  // every time country changes

  // initial render, fetch all the data
  useEffect(() => {
     // fetch(`${root}/all`)
     fetch(`http://localhost:5000/time`)
     .then(response => response.json())
     .then(data => {
       if (data != undefined || data != null) {
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

  // useEffect(() => {
  //   setLoading(true);
  //   setCountry(country.toLowerCase());
  //   if (cache[country.toLowerCase()] !== undefined) {
  //     // exists in cache - use cached data
  //     setAllData(cache[country.toLowerCase()]);
  //   } else {
  //     // fetch(`${root}/all`)
  //     fetch(`http://localhost:5000/time/${country}`)  // initial as canada for testing/dev purposes, use country
  //     .then(response => response.json())
  //     .then(data => {
  //       if (data != undefined || data != null) {
  //         // setAllData(prev => [...prev,...data]);
  //         setAllData(data);
  //         // store data in cache
  //         setCache(prev => {
  //           return {...prev, [country]:data}
  //         });
  //         // setAllData(allData.concat(data));
  //         // setAllLoaded(true);
  //         console.log(data);
  //         setLoading(false);
  //       } else {
  //         setLoading(false);
  //       }
  //     })
  //     .then(() => console.log(allData))
  //     .catch(err => {
  //       setLoading(false);
  //       console.log('Error fetching data');
  //     });
  //   }
  // }, [country]);

  const handleChange = (event) => {
    // event.nativeEvent.stopImmediatePropagation();
    setCountry(event.target.value); // setCountry is asnyc, triggers re-render, use useEffect for render changes
    // console.log('asdf');
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setLoading(true);
    // setCountry(country.toLowerCase());
    if (cache[country] !== undefined) {
      // exists in cache - use cached data
      setAllData(cache[country]);
      setLoading(false);
    } else {
      // fetch(`${root}/all`)
    //   fetch(`http://localhost:5000/time/${country}`)  // initial as canada for testing/dev purposes, use country
    //   .then(response => response.json())
    //   .then(data => {
    //     if (data != undefined || data != null) {
    //       // setAllData(prev => [...prev,...data]);
    //       setAllData(data);
    //       // store data in cache
    //       setCache(prev => {
    //         return {...prev, [country]:data}
    //       });
    //       // setAllData(allData.concat(data));
    //       // setAllLoaded(true);
    //       console.log(data);
    //       setLoading(false);
    //     } else {
    //       setLoading(false);
    //     }
    //   })
    //   .then(() => console.log(allData))
    //   .catch(err => {
    //     setLoading(false);
    //     console.log('Error fetching data');
    //   });
    // }
      console.log('not in cache');
      setLoading(false);
    }
  };

  // testing if data really was received and changed state of data
  const onClick = (event) => {
    console.log(allData);
    console.log(cache);
    console.log(country);
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
        <Typography paragraph variant='h6' style={{color: '#3399ff'}}>
          Enter the name of a country below:
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
        {/* { allData !== {}
        ?  */}
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
        {/* :
        ''
        } */}
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
      </main>
    </div>
  );
}