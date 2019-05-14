import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

import Grid from '@material-ui/core/Grid';
import './components/css/style.css';
import Header from './components/Header';
import Transaltions from './components/Translations';

const styles = theme => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing.unit * 2,
    textAlign: 'center',
    color: theme.palette.text.secondary,
    backgroundColor: 'lightgreen',
  },
  textDisplay:{
    padding: theme.spacing.unit * 2,
    textAlign: 'center',
    color: theme.palette.text.secondary,
    backgroundColor: 'lightgreen',
    marginBottom:'20px',
    height: 100
  },
  tokenList:{
    padding: theme.spacing.unit * 2,
    textAlign: 'center',
    color: theme.palette.text.secondary,
    backgroundColor: 'lightgreen',
    marginBottom:'20px',
    height: 252
  },
  selectButton:{
    // padding: theme.spacing.unit,
    padding: '2px',
    textAlign: 'center',
    color: theme.palette.text.secondary,
    backgroundColor: 'lightgreen',
    marginLeft: '10px',
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
        <Transaltions classes={classes} />
      </Grid>
    </div>
  );
}

App.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(App);