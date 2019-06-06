import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import './components/css/style.css';
import Header from './components/Header';
import HomePage from './components/HomePage';
import { BrowserRouter, Route} from 'react-router-dom';
import LoginPage from './components/LoginPage';
import SignUp from './components/SignUp';
import UploadSource from './components/UploadSource';
import AdminPage from './components/AdminPage';
import { Input } from '@material-ui/core';


const styles = theme => ({
  root: {
    flexGrow: 1,
  },
  body: {
    backgroundColor: 'black'
  },
  h1: {
    padding: '10px 0px 10px 10px',
    // margin: '0px',
    textAlign: 'left',
    color: '#fff',
    backgroundColor: 'black'

  },
  paper: {
    padding: theme.spacing.unit * 2,
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
  inputField:{
    width:'90%',
    marginLeft:'10px'
  },
  textDisplay: {
    padding: theme.spacing.unit,
    color: theme.palette.text.secondary,
    marginBottom: '10px',
    height: 140,
    width:'90%',
    overflow: 'auto',
    textAlign: 'justify',
    lineHeight: '25px',
    marginTop: '20px',
    marginLeft: '20px',
    marginRight: '10px',
  },
  tokenList: {
    textAlign: 'center',
    color: theme.palette.text.secondary,
    marginTop: '20px',
    marginLeft: '20px',
    height: 343,
    overflowX: 'hidden',
    overflowY: 'auto',
    backgroundColor: '#fff',
  },
  tokenUpdation: {
    color: theme.palette.text.secondary,
    marginTop: '20px',
    marginLeft: '20px',
    height: 343,
    // width: 500,
    backgroundColor: '#fff',
  },
  selectButtonPaper: {
    padding: theme.spacing.unit,
    textAlign: 'center',
    color: theme.palette.text.secondary,
    marginLeft: '20px',
    marginTop: '10%',
    marginBottom: '10px'
  },
  button:{
    marginLeft:'150px',
    marginTop:'20px'
  },
  spanning: {
    color: 'blue'
  },
  mainGrid: {
    width: '100%',
    paddingTop: '0',
    marginTop: '0',
    height: 'auto',
  },
  selectTwo: {
    padding: theme.spacing.unit,
    textAlign: 'center',
    color: theme.palette.text.secondary,
    marginLeft: '0px',
    position: 'fixed',
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
  },
  selectMenu2: {
    width: '120px',
    marginBottom:'5px'
  },
  highlightToken: {
    color: 'blue',
    backgroundColor: 'yellow'
  },
  loginPage:{
    marginTop:'5%'
  },
  forgot:{
    cursor:'pointer',
  },
  versionUpdate:{
    // padding:'5px',
    width:'95%',
    marginLeft:'10px',
    marginRight:'10px',
    marginTop:'10px',
    // backgroundColor:'#3d6b7d'
  },
  versionDisplay:{
    // padding:'5px',
    width:'110%',
    marginLeft:'10px',
    marginRight:'10px',
    marginTop:'10px'
  },
  versionTextField:{
    padding:'5px'
  },
  uploadLabel:{
    border: '1px solid black', 
    padding: '10px'
  },
  uploadGrid:{
    marginTop:'20px',
    marginLeft:'130px'
  },
  typeG:{
    backgroundColor: '#ccc',
    padding:'10px 0px'
  },
  form:{
    // backgroundColor:'blue',
    padding:'0px 5px'
  },
  input:{
    color:'#fff',
  },
  checkBox:{
    position:'right'
  }
});

function App(props) {
  const { classes } = props;
  return (
    <BrowserRouter>
      <Grid container className={classes.root}>
        <Grid item xs={12}>
          <Header classes={classes} />
        </Grid>
        <Grid item xs={12}>
          {/* <HomePage classes={classes} /> */}
          <Route exact path="/" component={() => <LoginPage classes={classes} />} />
          <Route path="/signin" component={() => <LoginPage classes={classes} />} />
          <Route path="/signup" component={() => <SignUp classes={classes} />} />
          <Route path="/homepage" component={() => <HomePage classes={classes} />} />
          <Route path="/upload" component={() => <UploadSource classes={classes} />} />
          <Route path="/admindashboard" component={() => <AdminPage classes={classes} />} />
          
        </Grid>
      </Grid>
    </BrowserRouter>
  );
}

App.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(App);