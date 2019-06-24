import React, { Component } from 'react';
import { Grid, Paper, Button } from '@material-ui/core';
import { TextField } from '@material-ui/core';
import ComponentHeading from './ComponentHeading';

export default class UpdateTokens extends Component {
    state = {
        translation: ''
    }

    async updateTransaltion() {
        const { sourceId, targetLanguageId, token, book } = this.props.data
        const apiData = {
            sourceId: sourceId,
            targetLanguageId: targetLanguageId,
            token: token,
            translation: this.state.translation,
            senses: ''
        }
        console.log('api', apiData)
        const update = await fetch('http://127.0.0.1:8000/v1/updatetokentranslations', {
            method: 'POST',
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
        const displayLanguage = ''
        if(targetLanguage){
            displayLanguage = targetLanguage
        }
        return (
            
            <Grid item xs={12} className={classes.containerGrid}>
                <Grid item xs={12}>    
                    <ComponentHeading data={{ classes: classes, text: `Enter ${displayLanguage} Translation` }} />
                    {/* <form onSubmit={this.handleSubmit}> */}
                </Grid>
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
                            onChange={(e) => this.setState({ translation: e.target.value })}
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
                {/* <input type="file" id="input" multiple onchange="handleFiles(this.files)"></input> */}



            </Grid>
        )
    }
}
