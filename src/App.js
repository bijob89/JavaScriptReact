import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

import Grid from '@material-ui/core/Grid';
import './components/css/style.css';
import Header from './components/Header';
import MenuBar from './components/MenuBar';

const styles = theme => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing.unit * 2,
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
  textDisplay:{
    padding: theme.spacing.unit * 2,
    textAlign: 'center',
    color: theme.palette.text.secondary,
    marginBottom:'20px',
    height: 100,
  },
  tokenList:{
    // padding: theme.spacing.unit * 2,
    textAlign: 'center',
    color: theme.palette.text.secondary,
    marginBottom:'20px',
    height: 252,
    overflow:'auto'
  },
  selectButton:{
    // padding: theme.spacing.unit,
    // padding: '2px',
    textAlign: 'center',
    color: theme.palette.text.secondary,
    marginLeft: '0px',
  },
  inputLabel:{
    padding:'2px',
    width:'20px',
    marginBottom:'10px'
  },
  ul:{
    marginRight:'-10%',
  },
  li:{
    width:'100%',
    float:'left',
    listStyle:'none',
    border:'1px solid grey'
  }
});

function App(props) {
  // console.log(props)
  const { classes } = props;
  // console.log(classes)
  return (
    <div className="mainGrid">
      <Grid container spacing={24}>
        <Grid item xs={12}>
          <Header />
        </Grid>
        <MenuBar classes={classes} />
      </Grid>
    </div>
  );
}

App.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(App);