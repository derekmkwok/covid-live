import React from 'react';
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

export default function Cases() {
  const classes = useStyles();
  console.log('Path ' + window.location.pathname)
  console.log('Hostname ' + window.location.hostname)
  console.log('protocol ' + window.location.protocol)
  console.log('origin ' + window.location.origin)
  console.log('Href ' + window.location.href)

  return (
    <div>
      <main className={classes.content}>
        <div className={classes.toolbar} />
        <Typography paragraph variant='h2' style={{color: '#FFF'}}>
          Cases Page
        </Typography>
      </main>
    </div>
  );
}