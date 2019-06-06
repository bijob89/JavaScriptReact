import React, { Component } from 'react';
import { Grid, Paper, Button } from '@material-ui/core';
import { TextField } from '@material-ui/core';

export default class UpdateTokens extends Component {
    state = {
        translation: ''
    }

    async updateTransaltion(){
        const { versionid, targetLanguageId, token } = this.props.data
        const apiData = {
            versionid: versionid,
            targetLanguageId: targetLanguageId,
            token: token,
            translation: this.state.translation
        }
        console.log('api', apiData)
        const update = await fetch('http://127.0.0.1:8000/v1/updatetokentranslations', {
            method:'POST',
            body: JSON.stringify(apiData)
        })
        const myJson = await update.json()
    }

    handleSubmit = e => {
        e.preventDefault();
        this.updateTransaltion();
    }
    render() {
        const { classes, token, targetLanguage } = this.props.data
        return (
            <Grid item xs={12}>
                <Paper className={classes.tokenUpdation}>

                    {/* <form onSubmit={this.handleSubmit}> */}
                        <Grid container item xs={12}>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    disabled
                                    // defaultValue="Select a Token"
                                    margin="normal"
                                    variant="outlined"
                                    label={token}
                                    className={classes.inputField}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    required
                                    label="Enter Translation"
                                    // defaultValue="Select a Token"
                                    onChange={(e) => this.setState({translation: e.target.value})}
                                    margin="normal"
                                    variant="outlined"
                                    className={classes.inputField}
                                />
                            </Grid>
                        </Grid>
                        <Button 
                        variant="contained" 
                        color="primary" 
                        className={classes.button}
                        onClick={this.handleSubmit}>Update Token</Button>
                    {/* </form> */}


                </Paper>
            </Grid>
        )
    }
}
