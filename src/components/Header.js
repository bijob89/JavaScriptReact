import React from 'react';
import { AppBar, Typography } from '@material-ui/core';

function Header(props) {
    return (
        <AppBar position="static" className={props.classes.h1}>
            <Typography component="h1" variant="h4" color="inherit">
                AutographaMT
            </Typography>
        </AppBar>
    )
}

export default Header;