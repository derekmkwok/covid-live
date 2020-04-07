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
  const [country, setCountry] = useState(null);
  const [allData, setAllData] = useState([]);

  // initial render
  useEffect(() => {
    // fetch(`${root}/all`)
    fetch(`http://localhost:5000/time/${'CANADA'}`)
      .then(response => response.json())
      .then(data => {
        setAllData(prev => [...prev,...data]);
        // setAllLoaded(true);
        console.log(data);
      })
      .then(() => console.log(allData))
      .catch(err => {
        console.log('Error fetching data');
      });
  }, [country]);

  return (
    <div>
      <main className={classes.content}>
        <div className={classes.toolbar} />
        <Typography paragraph variant='h2' style={{color: '#FFF'}}>
          TO BE ADDED
        </Typography>
        {/* {allData} */}
      </main>
    </div>
  );
}