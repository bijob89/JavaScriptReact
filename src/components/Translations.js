import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import { Select, MenuItem } from '@material-ui/core';
import InputLabel from '@material-ui/core/InputLabel';


class Translations extends Component {
    // console.log(props)
    constructor(props) {
        super(props);
        this.state = {
            book: '',
            tokenList: []
        }
        // this.getBooks()
    }

    getBookItems() {
        // this.getBooks()
        if (this.props.data.books) {
            return this.props.data.bookList.map(item => {
                return (
                    <MenuItem key={item} value={item}>{item}</MenuItem>
                )
            })
        } else {
            return (
                <MenuItem key="" value="">Select Book</MenuItem>
            )
        }
    }

    async getTokenList(){
        var book = await fetch('http://127.0.0.1:8000/v1/tokenlist/' + this.props.data.language + '/' + this.props.data.version + '/' + this.state.book, {
            method:'GET'
        })
        const mJson = await book.json();
        this.setState({
            tokenList:mJson,
            books:true
        })
    }

    getTokens(){
        return this.state.tokenList.map(item => {
            return (
            <li className={this.props.data.classes.li} key={item} value={item}>{item}</li>
            )
        })
    }

    render() {
        console.log(this.props)
        console.log(this.state)
        // this.getBooks()
        return (
            <Grid container spacing={24}>
                <Grid item xs={4}>
                    <Paper className={this.props.data.classes.tokenList}>
                        <Grid>
                            <Paper className={this.props.data.classes.selectbutton}>
                                <InputLabel htmlFor="formatted-text-mask-input">Choose Book</InputLabel>
                                <Select
                                    value={this.state.book}
                                    onChange={(e) => this.setState({ book: e.target.value }, () => {this.getTokenList()})}
                                >
                                    {this.getBookItems()}
                                </Select>
                            </Paper>
                        </Grid>
                        <ul className={this.props.data.classes.selectbutton}>
                            {/* <li className={this.props.data.classes.li}>one</li> */}
                            {this.getTokens()}
                        </ul>
                    </Paper>
                </Grid>
                <Grid item xs={8}>
                    <Grid item xs={12}>
                        <Paper className={this.props.data.classes.textDisplay}>xs=6</Paper>
                    </Grid>
                    <Grid item xs={12}>
                        <Paper className={this.props.data.classes.textDisplay}>xs=6</Paper>
                    </Grid>
                </Grid>
                <Grid item xs={3}>
                    <Paper className={this.props.data.classes.paper}>xs=3</Paper>
                </Grid>
                <Grid item xs={3}>
                    <Paper className={this.props.data.classes.paper}>xs=3</Paper>
                </Grid>
                <Grid item xs={3}>
                    <Paper className={this.props.data.classes.paper}>xs=3</Paper>
                </Grid>
                <Grid item xs={3}>
                    <Paper className={this.props.data.classes.paper}>xs=3</Paper>
                </Grid>
            </Grid>
        )
    }
}

export default Translations;