import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

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

export default function Charts() {
  const classes = useStyles();

  // hooks
  const [country, setCountry] = useState('canada');  // initial as canada for testing/dev purposes
  const [allData, setAllData] = useState([]);
  const [cache, setCache] = useState({});  // local cache to store previously searched arrays of time series data

  // every time country changes
  useEffect(() => {
    setCountry(country.toLowerCase());
    if (cache[country.toLowerCase()] !== undefined) {
      // exists in cache - use cached data
      setAllData(cache[country.toLowerCase()]);
    } else {
      // fetch(`${root}/all`)
      fetch(`http://localhost:5000/time/${'CANADA'}`)  // initial as canada for testing/dev purposes, use country
      .then(response => response.json())
      .then(data => {
        // setAllData(prev => [...prev,...data]);
        setAllData(data);
        setCache(prev => {
          return {...prev, [country]:data}
        });
        // setAllData(allData.concat(data));
        // setAllLoaded(true);
        console.log(data);
      })
      .then(() => console.log(allData))
      .catch(err => {
        console.log('Error fetching data');
      });
    }
  }, [country]);

  // testing if data really was received and changed state of data
  const onClick = (event) => {
    console.log(allData);
    console.log(cache);
  }

  return (
    <div>
      <main className={classes.content}>
        <div className={classes.toolbar} />
        <Typography paragraph variant='h2' style={{color: '#FFF'}}>
          TO BE ADDED
        </Typography>
        {/* {allData} */}
        <button onClick={onClick}>CLICK</button>
      </main>
    </div>
  );
}