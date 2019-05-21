import React, { Component, Fragment } from "react";
// import { Grid } from "@material-ui/core";
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import { TextField } from "@material-ui/core";





class ConcordanceBooks extends Component {
    constructor(props) {
        super(props)
        this.state = {
            usfmText: ''
        }
    }


    // componentWillMount(){
    //     console.log("componentWill", this.props.data.book)
    //     if(this.props.data.book){
    //         fetch('http://127.0.0.1:8000/v1/tokenlist/' + this.props.data.language + '/' + this.props.data.version + '/' + this.props.data.book, {
    //             method:'GET'
    //         })
    //         .then(result => result.json())
    //         .then(res => this.setState({usfmText:res}))
    //     }
    // }

    displayUsfmText() {
        if (this.props.data.usfmTextList === []) {
            return <p>Loading data</p>
        } else {
            return this.props.data.usfmTextList.map(item => {
                return (
                    <p>{item}</p>
                )
            })
            // <p>{this.props.data.usfmText}</p>
        }
    }

    render() {
        console.log("conc", this.props)
        return (
            <Fragment>
                <Grid item xs={8}>
                    <Grid item xs={12}>
                        <Paper className={this.props.data.classes.textDisplay}>
                            {this.displayUsfmText()}

                        </Paper>
                    </Grid>
                    <Grid item xs={12}>
                        <Paper className={this.props.data.classes.textDisplay}>xs=6


                        </Paper>
                    </Grid>
                </Grid>
                <Grid className={this.props.data.classes.mainGrid} container spacing={24}>
                    {/* <Paper> */}
                    <Grid item xs={3}>
                        {/* xs */}
                        <Paper className={this.props.data.classes.paper}>xs=3
                    <TextField type="file" name="file" />
                        </Paper>
                    </Grid>
                    <Grid item xs={3}>
                        {/* xs */}
                        <Paper className={this.props.data.classes.paper}>xs=3</Paper>
                    </Grid>
                    <Grid item xs={3}>
                        {/* xs */}
                        <Paper className={this.props.data.classes.paper}>xs=3</Paper>
                    </Grid>
                    <Grid item xs={3}>
                        {/* xs */}
                        <Paper className={this.props.data.classes.paper}>xs=3</Paper>
                    </Grid>
                    {/* </Paper> */}
                </Grid>
            </Fragment>
        )
    }
}


export default ConcordanceBooks;