import React from 'react';
import { AppBar, Typography } from '@material-ui/core';
import SignedInLinks from './SignedInLinks';
import { Grid } from '@material-ui/core';

function Header(props) {
    return (
        // <AppBar position="static" className={props.classes.h1}>
        <AppBar title="AutographaMT" position="static" className={props.classes.h1}>
            
            <Grid container item xs={12}>
            <Grid item xs={3}>
            <Typography component="h1" variant="h4" color="inherit">
                AutographaMT
            </Typography>
            
            </Grid>
            <Grid item xs={9}>
            
            <SignedInLinks />
            </Grid>
            
            </Grid>
        </AppBar>
    )
}

export default Header;