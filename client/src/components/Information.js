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

export default function Information() {
  const classes = useStyles();

  return (
    <div>
      <main className={classes.content}>
        <div className={classes.toolbar} />
        <Typography paragraph variant='body1' style={{color: '#FFF'}}>
          <b>What is COVID-19?</b>
          <br></br><br></br>
          COVID-19, also known as Coronavirus, is a highly infectious disease.
          There is currently no specific vaccine or treatment to this disease.
          It is important to protect yourself and others from infection through best practices and preventative measures.
          <br></br><br></br><br></br>
          <b>Best Practices:</b>
          <ul>
            <li>Wash hands with soap frequently</li>
            <li>Use hand sanitizer</li>
            <li>Do not touch face</li>
            <li>Respiratory etiquette (cough into elbow)</li>
            <li>Social distancing (at least 2m or 6ft apart)</li>
          </ul>
          <br></br><br></br>
          <b>Resources and More Information:</b>
          <ul>
            <li><a href='https://www.who.int/health-topics/coronavirus'>World Health Organization</a></li>
          </ul>
        </Typography>
      </main>
    </div>
  );
}