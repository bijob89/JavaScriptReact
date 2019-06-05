import React, { Component } from 'react';
import { Grid, Paper, ListItem, Divider } from '@material-ui/core';

export default class TokenList extends Component {

    async getVerseText(token) {
        const { language, book} = this.props.data
        const data = await fetch('http://127.0.0.1:8000/v1/concordances/' + language + '/' + book + '/' + token, {
            method:'GET'
        })
        const concordance = await data.json()
        await this.props.data.updateState({concordance:concordance})
    }


    handleClick = e => {
        var word = e.target.getAttribute('value')
        this.props.data.updateState({token:word})
        this.getVerseText(word)
    }

    getTokens(tokenList){
        if(this.props.data.tokenList && this.props.data.targetLanguage){
            return tokenList.map(item => {
                return (
                   <div key={item}>
                    <ListItem button
                    key={item} 
                    name={item} 
                    value={item} 
                    onClick={this.handleClick}>{item}</ListItem><Divider /></div>
                )
            })
        }else{
            return <ListItem>Select Target Language to display tokens</ListItem>
        }
    }
    
    render() {
        const { classes, tokenList} = this.props.data
        return (
            <Grid  item xs={12}>
                <Paper className={classes.tokenList}>
                    {this.getTokens(tokenList)}
                </Paper>
            </Grid>
        )
    }
}
