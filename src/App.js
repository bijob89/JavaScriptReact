import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import './components/css/style.css';
import Header from './components/Header';
import HomePage from './components/HomePage';

const styles = theme => ({
  root: {
    flexGrow: 1,
  },
  body: {
    backgroundColor: 'black'
  },
  h1: {
    padding: '10px 0px 20px 0px',
    // width:'100%',
    margin: '0px',
    textAlign: 'center',
    color: '#fff',
    backgroundColor: 'black'

  },
  paper: {
    padding: theme.spacing.unit * 2,
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
  textDisplay: {
    padding: theme.spacing.unit,
    textAlign: 'center',
    color: theme.palette.text.secondary,
    marginBottom: '10px',
    height: 140,
    overflow: 'auto',
    textAlign: 'justify',
    lineHeight: '25px',
    marginTop:'20px',
    marginLeft:'20px'
  },
  tokenList: {
    // padding: theme.spacing.unit * 2,
    textAlign: 'center',
    color: theme.palette.text.secondary,
    marginTop:'20px',
    marginLeft:'20px',
    // marginBottom:'20px',
    height: 343,
    overflowX: 'hidden',
    overflowY: 'auto',
    backgroundColor: '#fff',
  },
  selectButtonPaper: {
    padding: theme.spacing.unit,
    // padding: '2px',
    textAlign: 'center',
    color: theme.palette.text.secondary,
    marginLeft: '20px',
    marginTop: '5%',
    marginBottom: '10px'

  },
  spanning: {
    color: 'blue'
  },
  mainGrid: {
    // backgroundColor:"blue",
    width: '100%',
    // marginLeft:'auto',
    // marginRight:'auto',
    // backgroundColor:'blue',
    // paddingLeft:'20px',
    // paddingRight:'20px',
    paddingTop: '0',
    marginTop: '0',
    height: 'auto',
    // backgroundImage: `url(${Image})`,
    // backgroundSize: 'cover',
    // backgroundRepeat: 'no-repeat'
  },
  selectTwo: {
    padding: theme.spacing.unit,
    // padding: '2px',
    textAlign: 'center',
    color: theme.palette.text.secondary,
    marginLeft: '0px',
    position: 'fixed',
    // top:'20%',
    // marginBottom:'10%',
    width: '29%',

  },
  inputLabel: {
    padding: '2px',
    width: '20px',
    marginBottom: '10px',
    marginRight: '10%',
    backgroundColor: 'blue'
  },
  ul: {
    marginRight: '-10%',
    marginTop: '20%',
  },
  li: {
    width: '100%',
    float: 'left',
    listStyle: 'none',
    border: '1px solid grey',
    padding: '5px'
  },
  ulDiv: {
    overflow: 'auto',
    height: 100,
    borderBottom: '1px solid black'
  },
  selectMenu: {
    width: '120px',
    // backgroundColor:'blue'
  },
  highlightToken: {
    color: 'blue',
    backgroundColor: 'yellow'
  }
});

function App(props) {
  const { classes } = props;
  return (
    <Grid container className={classes.root}>
      <Grid  xs={12}>
        <Header classes={classes} />
      </Grid>
      <Grid xs={12}>
        <HomePage classes={classes} />
      </Grid>
    </Grid>
  );
}

App.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(App);