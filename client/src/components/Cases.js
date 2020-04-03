import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';

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

  // hooks
  const [country, setCountry] = useState('');
  const [cases, setCases] = useState(0);
  const [deaths, setDeaths] = useState(0);
  const [recovered, setRecovered] = useState(0);
  const [active, setActive] = useState(0);
  const [today, setToday] = useState(0);

  // TODO RENDER THE DATA ON THE PAGE
  useEffect(() => {
    // fetch(`${root}/all`)
    fetch(`http://localhost:5000/country/${country}`)
      .then(response => response.json())
      .then(data => {
        setCases(data['cases']);
        setDeaths(data['deaths']);
        setRecovered(data['recovered']);
        setActive(data['active']);
        setToday(data['todayCases']);
      })
      .then(() => console.log(cases))
      .catch(err => console.log('Error fetching data'));
  });

  const handleChange = (event) => {
    setCountry(event.target.value); // setCountry is asnyc and triggers re-render, use useEffect for render changes
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
        <Typography paragraph variant='h5' style={{color: '#FFF'}}>
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
    </form>
      </main>
    </div>
  );
}