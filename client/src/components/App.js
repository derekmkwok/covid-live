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
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';

// Component import
import Home from './Home';
import Cases from './Cases';

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

export default function PermanentDrawerLeft() {
  const classes = useStyles();

  return (
    <Router>
      <div className={classes.root}>
        <CssBaseline />
        <AppBar position="fixed" className={classes.appBar} style={{backgroundColor:'#282c34'}}>
          <Toolbar>
            <Typography variant="h6" noWrap style={{margin: 'auto'}}>
            <FontAwesomeIcon icon={faLungsVirus} style={{marginRight: '10px'}}></FontAwesomeIcon>
              COVID-19 Live Tracker
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
          <Divider />
          <List>
            {/* {['Cases', 'Graphs', 'Information'].map((text, index) => (
              <Link to='/cases' style={{ textDecoration: 'none' }}>
                <ListItem button key={text}>
                  <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
                  <ListItemText primary={text} />
                </ListItem>
              </Link>
            ))} */}
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
            <Link to='/graphs' style={{ textDecoration: 'none' }}>
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
          <Divider />
        </Drawer>        

        <Switch>
          <Route path="/" exact>
            <Home />
          </Route>
          <Route path="/cases" exact>
            <Cases />
          </Route>
          <Route path="/charts" exact>
            {/* <Users /> */}
          </Route>
          <Route path="/information" exact>
            {/* <Home /> */}
          </Route>
        </Switch>
      </div>
    </Router>
  );
}