import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

// Component imports
import Home from './Home';
import Cases from './Cases';
import Charts from './Charts';
import Information from './Information';

// Font awesome icon imports
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLungsVirus } from '@fortawesome/free-solid-svg-icons';
import { faShieldVirus } from '@fortawesome/free-solid-svg-icons';
import { faHouseUser } from '@fortawesome/free-solid-svg-icons';
import { faHospital } from '@fortawesome/free-solid-svg-icons';
import { faChartBar } from '@fortawesome/free-solid-svg-icons';

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
    backgroundColor: '#252525',
    borderColor: '#a3a3a3'
  },
  toolbar: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    backgroundColor: '#282c34',
    padding: theme.spacing(3),
    height: '100%'
  },
  dividerColor: {
    backgroundColor: '#171717'
  }
}));

export default function PermanentDrawerLeft() {
  const classes = useStyles();

  return (
    <Router>
      <div className={classes.root}>
        <CssBaseline />
        <AppBar position="fixed" className={classes.appBar} style={{backgroundColor:'#252525'}}>
          <Toolbar>
            <Typography variant="h3" noWrap style={{margin: 'auto', color: '#FFD700', fontWeight: 'bold'}}>
              COVID-19 Live Tracker
              <FontAwesomeIcon icon={faLungsVirus} style={{marginLeft: '20px'}}></FontAwesomeIcon>
            </Typography>
          </Toolbar>
        </AppBar>
        <Drawer
          className={classes.drawer}
          variant="permanent"
          classes={{
            paper: classes.drawerPaper,
          }}
          anchor="left"
        >
          <div className={classes.toolbar} />
          <Divider className={classes.dividerColor} />
          <List>
            <Link to='/' style={{ textDecoration: 'none' }}>
              <ListItem button key='Home'>
              <FontAwesomeIcon icon={faHouseUser} style={{marginRight: '25px'}} size='2x'></FontAwesomeIcon>
              <ListItemText primary='Home' />
              </ListItem>
            </Link>
            <Link to='/cases' style={{ textDecoration: 'none' }}>
              <ListItem button key='Cases'>
              <FontAwesomeIcon icon={faHospital} style={{marginRight: '28px', marginLeft: '3px'}} size='2x'></FontAwesomeIcon>
              <ListItemText primary='Cases' />
              </ListItem>
            </Link>
            <Link to='/charts' style={{ textDecoration: 'none' }}>
              <ListItem button key='Charts'>
              <FontAwesomeIcon icon={faChartBar} style={{marginRight: '25px', marginLeft: '2px'}} size='2x'></FontAwesomeIcon>
              <ListItemText primary='Charts' />
              </ListItem>
            </Link>
            <Link to='/information' style={{ textDecoration: 'none' }}>
              <ListItem button key='Information'>
              <FontAwesomeIcon icon={faShieldVirus} style={{marginRight: '26px', marginLeft: '2px'}} size='2x'></FontAwesomeIcon>
              <ListItemText primary='Information' />
              </ListItem>
            </Link>
          </List>
          <Divider className={classes.dividerColor} />
        </Drawer>        

        <Switch>
          <Route path="/" exact>
            <Home />
          </Route>
          <Route path="/cases" exact>
            <Cases />
          </Route>
          <Route path="/charts" exact>
            <Charts />
          </Route>
          <Route path="/information" exact>
            <Information />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}