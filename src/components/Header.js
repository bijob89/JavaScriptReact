import React from 'react';
import { AppBar, Typography, Toolbar } from '@material-ui/core';
import SignedInLinks from './SignedInLinks';

function Header(props) {
    return (
        // <AppBar position="static" className={props.classes.h1}>
        // <div className={props.classes.root}>
            <AppBar position="static" className={props.classes.h1}>

                {/* <Grid container item xs={12}> */}
                {/* <Grid item xs={3}> */}
                <Toolbar>
                    <Typography variant="h5" color="inherit" className={props.classes.grow}>
                        AutographaMT
                    </Typography>

                    {/* </Grid> */}
                    {/* <Grid item xs={9} style={{ float: 'right' }}> */}
                    {/* <Button color="inherit">Login</Button> */}

                    <SignedInLinks />
                </Toolbar>
                {/* </Grid> */}

                {/* </Grid> */}
            </AppBar>
        // </div>
    )
}

export default Header;