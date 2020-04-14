import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

// Font-Awesome imports
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLaptopHouse} from '@fortawesome/free-solid-svg-icons';

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
  toolbar: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    backgroundColor: '#282c34',
    padding: theme.spacing(3),
    height: '100%'
  },
}));

export default function Home() {
  const classes = useStyles();

  return (
    <div>
      <main className={classes.content}>
        <div className={classes.toolbar} />
        <Typography paragraph variant='h3' style={{color: 'orange', margin: 'auto', fontWeight: 'bold'}}>
          Welcome!
          <FontAwesomeIcon icon={faLaptopHouse} size='1x' style={{ marginLeft: '20px' }}></FontAwesomeIcon>
        </Typography>
        <br></br>
        <Typography paragraph variant='h5' style={{color: '#3399ff'}}>
          From the navigation bar on the left, please select:
        </Typography>
        <Typography paragraph variant='h6' style={{color: '#B0C4DE'}}>
          <b>Cases</b> - COVID-19 statistics worldwide or filtered by country
        </Typography>
        <Typography paragraph variant='h6' style={{color: '#B0C4DE'}}>
          <b>Charts</b> - Visualized charts/graphs of COVID-19 data
        </Typography>
        <Typography paragraph variant='h6' style={{color: '#B0C4DE'}}>
          <b>Information</b> - Resources and information regarding COVID-19
        </Typography>
      </main>
    </div>
  );
}