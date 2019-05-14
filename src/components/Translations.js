import React from 'react';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import MenuBar from './MenuBar';



function Translations(props) {
    // console.log(props)
    return (
        <Grid container spacing={24}>
            <Grid item xs={12}>
            <MenuBar classes={props.classes} />
            </Grid>
            
            <Grid item xs={4}>
                <Paper className={props.classes.tokenList}>xs=4</Paper>
            </Grid>
            <Grid item xs={8}>
                <Grid item xs={12}>
                    <Paper className={props.classes.textDisplay}>xs=6</Paper>
                </Grid>
                <Grid item xs={12}>
                    <Paper className={props.classes.textDisplay}>xs=6</Paper>
                </Grid>
            </Grid>
            <Grid item xs={3}>
                <Paper className={props.classes.paper}>xs=3</Paper>
            </Grid>
            <Grid item xs={3}>
                <Paper className={props.classes.paper}>xs=3</Paper>
            </Grid>
            <Grid item xs={3}>
                <Paper className={props.classes.paper}>xs=3</Paper>
            </Grid>
            <Grid item xs={3}>
                <Paper className={props.classes.paper}>xs=3</Paper>
            </Grid>
        </Grid>
    )
}

export default Translations;