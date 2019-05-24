import React, { Component } from 'react'
import { Grid, Paper } from '@material-ui/core';

export default class Concordance extends Component {

    displayConcordance(value, token) {
        if (value) {
            return value.map(item => {
                const bcv = item.book + item.chapterNumber + item.verseNumber
                return (
                    <p key={item.bcv}>
                        <span>{item.book.toUpperCase()} {item.chapterNumber}:{item.verseNumber} </span>
                        {item.verse.split(" ").map(span => {
                            if (span.includes(token)) {
                                return (
                                    <span className={this.props.data.classes.highlightToken}> {span} </span>
                                )
                            } else {
                                return (
                                    <span> {span} </span>
                                )
                            }
                        }
                        )}
                    </p>
                )
            })
        } else {
            return <p>Select Token to Load Data</p>
        }
    }
    render() {
        const { classes, concordance, book, token } = this.props.data
        return (
            <Grid container xs={12}>
                <Grid item xs={12}>
                    <Paper className={classes.textDisplay}>
                        {this.displayConcordance(concordance[book.toLowerCase()], token)}
                    </Paper>
                </Grid>
                <Grid item xs={12}>
                    <Paper className={classes.textDisplay}>
                        {this.displayConcordance(concordance.all, token)}
                    </Paper>
                </Grid>
            </Grid>
        )
    }
}
