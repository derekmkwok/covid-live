import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';

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

export default function Cases() {
  const classes = useStyles();

  // hooks
  const [country, setCountry] = useState('');
  const [countries, setCountries] = useState([]);

  // TODO: Change method of selection, too much data to load just for an array of countries
  useEffect(() => {
    // fetch(`${root}/all`)
    fetch(`http://localhost:5000/country/all`)
      .then(response => response.json())
      .then(data => {
        data.map(obj => {
          // pushing all country object's 'country' (name) property into the array of countries
          setCountries(oldArray => [...oldArray, obj['country']]);
        })
      })
      .catch(err => console.log('Error fetching data'));
  });

  const handleChange = (event) => {
    setCountry(event.target.value);
  };

  return (
    <div>
      <main className={classes.content}>
        <div className={classes.toolbar} />
        <Typography paragraph variant='h3' style={{color: '#B0C4DE', textDecoration: 'underline', margin: 'auto'}}>
          Country Statistics
        </Typography>
        <Typography paragraph variant='h6' style={{color: '#FFF'}}>
          Enter the name of a country below to get more information
        </Typography>
        <form className={classes.root} noValidate autoComplete="off">
          <TextField
            id="outlined-select-currency"
            select
            label="Select"
            value={country}
            onChange={handleChange}
            helperText="Please select country"
            variant="outlined"
          >
            {countries.map((country) => (
              <MenuItem key={country} value={country}>
                {country}
              </MenuItem>
            ))}
          </TextField>
        </form>
      </main>
    </div>
  );
}