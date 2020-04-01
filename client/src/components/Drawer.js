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
    borderColor: 'black'
  },
  // necessary for content to be below app bar
  toolbar: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    // backgroundColor: 'theme.palette.background.default',
    backgroundColor: '#282c34',
    padding: theme.spacing(3),
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
            <Typography variant="h6" noWrap>
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
        <main className={classes.content}>
          <div className={classes.toolbar} />
          <Typography paragraph style={{color: '#FFF'}}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt
            ut labore et dolore magna aliqua. Rhoncus dolor purus non enim praesent elementum
            facilisis leo vel. Risus at ultrices mi tempus imperdiet. Semper risus in hendrerit
            gravida rutrum quisque non tellus. Convallis convallis tellus id interdum velit laoreet id
            donec ultrices. Odio morbi quis commodo odio aenean sed adipiscing. Amet nisl suscipit
            adipiscing bibendum est ultricies integer quis. Cursus euismod quis viverra nibh cras.
            Metus vulputate eu scelerisque felis imperdiet proin fermentum leo. Mauris commodo quis
            imperdiet massa tincidunt. Cras tincidunt lobortis feugiat vivamus at augue. At augue eget
            arcu dictum varius duis at consectetur lorem. Velit sed ullamcorper morbi tincidunt. Lorem
            donec massa sapien faucibus et molestie ac.
          </Typography>
          <Typography paragraph>
            Consequat mauris nunc congue nisi vitae suscipit. Fringilla est ullamcorper eget nulla
            facilisi etiam dignissim diam. Pulvinar elementum integer enim neque volutpat ac
            tincidunt. Ornare suspendisse sed nisi lacus sed viverra tellus. Purus sit amet volutpat
            consequat mauris. Elementum eu facilisis sed odio morbi. Euismod lacinia at quis risus sed
            vulputate odio. Morbi tincidunt ornare massa eget egestas purus viverra accumsan in. In
            hendrerit gravida rutrum quisque non tellus orci ac. Pellentesque nec nam aliquam sem et
            tortor. Habitant morbi tristique senectus et. Adipiscing elit duis tristique sollicitudin
            nibh sit. Ornare aenean euismod elementum nisi quis eleifend. Commodo viverra maecenas
            accumsan lacus vel facilisis. Nulla posuere sollicitudin aliquam ultrices sagittis orci a.
          </Typography>
          <Link to='./cases'>
          <button>test</button>
        </Link>
        </main>
        

        <Switch>
          <Route path="/">
            {/* <About /> */}
          </Route>
          <Route path="/cases">
            {/* <About /> */}
          </Route>
          <Route path="/charts">
            {/* <Users /> */}
          </Route>
          <Route path="/information">
            {/* <Home /> */}
          </Route>
        </Switch>
      </div>
    </Router>
  );
}