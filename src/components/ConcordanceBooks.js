import React, { Component, Fragment } from "react";
import { TextField, Paper, Grid } from "@material-ui/core";


class ConcordanceBooks extends Component {
    constructor(props) {
        super(props)
        this.state = {
            usfmText: ''
        }
    }

    displayBookConcordance() {
        // console.log("error area", this.props)
        // if(!this.props.data.book){
        //     return <p>Select Token to Load Data</p>
        // }else if (!this.props.data.usfmTextList) {
        //     return <p>Select Token to Load Data</p>
        if(!this.props.data.book){
            return <p>Select Token to Load Data</p>
        // }else if (!this.props.data.usfmTextList) {
        //     return <p>Select Token to Load Data</p>
        }else if(this.props.data.usfmTextFlag) {
            const { book, usfmTextList, selectedToken, classes } = this.props.data
            return usfmTextList[book.toLowerCase()].map(item => {
                return (
                    <p key={item.book}>
                        <span>{item.book.toUpperCase()} {item.chapterNumber}:{item.verseNumber} </span>
                        {item.verse.split(" ").map(span => {
                            if(span.includes(selectedToken)){
                                return(
                                    <span className={classes.highlightToken}> {span} </span>
                                )
                            }else {
                                return (
                                    <span> {span} </span>
                                )
                            }
                            }
                        )}
                    </p>
                )
            })
        }else{
            return <p>Select Token to Load Data</p>
        }
    }

    displayAllBooksConcordance() {
        // console.log("book", this.props.data.book)
        if(!this.props.data.book){
            return <p>Select Token to Load Data</p>
        // }else if (!this.props.data.usfmTextList) {
        //     return <p>Select Token to Load Data</p>
        }else if(this.props.data.usfmTextFlag) {
            const { book, usfmTextList, selectedToken, classes } = this.props.data
            return usfmTextList.all.map(item => {
                return (
                    <p key={item.book}>
                        <span>{item.book.toUpperCase()} {item.chapterNumber}:{item.verseNumber} </span>
                        {item.verse.split(" ").map(span => {
                            if(span.includes(selectedToken)){
                                return(
                                    <span className={classes.highlightToken}> {span} </span>
                                )
                            }else {
                                return (
                                    <span> {span} </span>
                                )
                            }
                            }
                        )}
                    </p>
                )
            })
        }else{
            return <p>Select Token to Load Data</p>
        }
    }


    render() {
        // console.log("conc", this.props)
        console.log("props",this.props)
        
        return (
            <Fragment>
                <Grid item xs={8}>
                    <Grid item xs={12}>
                        <Paper className={this.props.data.classes.textDisplay}>
                            {this.displayBookConcordance()}

                        </Paper>
                    </Grid>
                    <Grid item xs={12}>
                        <Paper className={this.props.data.classes.textDisplay}>
                            {this.displayAllBooksConcordance()}

                        </Paper>
                    </Grid>
                </Grid>
                <Grid className={this.props.data.classes.mainGrid} container spacing={24}>
                    {/* <Paper> */}
                    <Grid item xs={3}>
                        {/* xs */}
                        <Paper className={this.props.data.classes.paper}>
                        Space For Translation Notes
                        </Paper>
                    </Grid>
                    <Grid item xs={3}>
                        {/* xs */}
                        <Paper className={this.props.data.classes.paper}>
                        Space For Translation Word
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
                    {/* </Paper> */}
                </Grid>
            </Fragment>
        )
    }
}


export default ConcordanceBooks;