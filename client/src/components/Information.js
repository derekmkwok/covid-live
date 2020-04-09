import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

// Font-Awesome imports
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faViruses } from '@fortawesome/free-solid-svg-icons';
import { faHandsWash } from '@fortawesome/free-solid-svg-icons';
import { faUserMd } from '@fortawesome/free-solid-svg-icons';

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

export default function Information() {
  const classes = useStyles();

  return (
    <div>
      <main className={classes.content}>
        <div className={classes.toolbar} />
        {/* <Typography paragraph variant='h6' style={{color: '#F8F8FF'}}> */}
        <Typography paragraph variant='h6' style={{color: '#3399ff'}}>
          <b><u>What is COVID-19?</u>
          <FontAwesomeIcon icon={faViruses} size='2x' style={{ marginLeft: '10px', color: '#8B0000' }}></FontAwesomeIcon></b>
        </Typography>
        <Typography paragraph variant='h6' style={{color: '#B0C4DE'}}>
          COVID-19, also known as Coronavirus, is a highly infectious disease.
          There is currently no specific vaccine or treatment to this disease.
          It is important to protect yourself and others from infection through best practices and preventative measures.
          Staying informed regarding facts about COVID-19 is also very important.
        </Typography>
        <br></br>
        <Typography paragraph variant='h6' style={{color: '#3399ff'}}>
          <b><u>Some Best Practices:</u>
          <FontAwesomeIcon icon={faHandsWash} size='2x' style={{ marginLeft: '10px', color: '#0066cc' }}></FontAwesomeIcon></b>
        </Typography>
          {/* Using ul tag throws a warning error in console */}
        <Typography paragraph variant='h6' style={{color: '#B0C4DE'}}>
          <li style={{marginLeft: '40px'}}>Wash hands with soap frequently</li>
          <li style={{marginLeft: '40px'}}>Use hand sanitizer</li>
          <li style={{marginLeft: '40px'}}>Do not touch face</li>
          <li style={{marginLeft: '40px'}}>Respiratory etiquette (cough into elbow)</li>
          <li style={{marginLeft: '40px'}}>Social distancing (at least 2m or 6ft apart)</li>
        </Typography>
        <br></br>
        <Typography paragraph variant='h6' style={{color: '#3399ff'}}>
          <b><u>Resources and More Information:</u>
          <FontAwesomeIcon icon={faUserMd} size='2x' style={{ marginLeft: '10px', color: 'green' }}></FontAwesomeIcon></b>
        </Typography>
        <Typography paragraph variant='h6' style={{color: '#B0C4DE'}}>
          <li style={{marginLeft: '40px'}}><a href='https://www.who.int/health-topics/coronavirus' style={{color: '#B0C4DE'}}>World Health Organization</a></li>
        </Typography>
      </main>
    </div>
  );
}