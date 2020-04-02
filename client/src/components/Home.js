import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

// React Router import
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

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
    // borderColor: 'gray'
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
 
  // const data = fetch(`${root}/all`);
  useEffect(() => {
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
        {/* <Typography paragraph variant='h5' style={{color: '#FFF'}}>
          <b>Welcome to the COVID-19 Live Tracker Web Application</b>
        </Typography> */}
        <Typography paragraph variant='h6' style={{color: '#FFF'}}>
          Total Cases: {cases != 0 ? cases : 'Loading total cases...'}
        </Typography>
        <Link to='./cases'>
          <button>test</button>
        </Link>
      </main>
    </div>
  );
}