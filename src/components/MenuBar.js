import React, { Component } from 'react';
import { FormControl, Grid, Paper, MenuItem, Select, InputLabel } from '@material-ui/core';
import './css/style.css'

class MenuBar extends Component {
    constructor(props) {
        super(props)
        this.state = {
            languageVersionData: {},
            language: '',
            version: '',
            bookList: '',
            book: '',
            tokenList: [],
            usfmTextFlag: false
        }
    }

    getLanguageData = async () => {
        const result = await fetch("http://127.0.0.1:8000/v1/getlanguages", {
            method: 'GET'
        });
        const mJson = await result.json();
        var languageVersionData = mJson.languages
        this.setState({ languageVersionData })
    }


    async getBooks() {
        var book = await fetch('http://127.0.0.1:8000/v1/books/' + this.state.language + '/' + this.state.version, {
            method: 'GET'
        })
        const mJson = await book.json();
        this.setState({
            bookList: mJson
        })

    }

    displayLanguages(value) {
        var languages = Object.keys(value);
        return languages.map(item => {
            return (
                <MenuItem key={item} value={item}>{item}</MenuItem>
            )
        })
    }

    displayVersions(language) {
        if (!language) {
            return <MenuItem key="" value="">Loading Versions</MenuItem>
        }
        return this.state.languageVersionData[language].map(item => {
            return (
                <MenuItem key={item.id} value={item.version}>{item.version}</MenuItem>
            )
        })
    }

    async componentDidMount() {
        this.getLanguageData()
    }

    async getTokenList() {
        var book = await fetch('http://127.0.0.1:8000/v1/tokenlist/' + this.state.language + '/' + this.state.version + '/' + this.state.book, {
            method: 'GET'
        })
        const tokenList = await book.json();
        this.props.data.updateState({tokenList: tokenList})
    }


    onVersionSelection = (value) => {
        this.getBooks()
        this.props.data.updateState({version: value})
    }

    onBookSelection = (value) => {
        this.getTokenList()
        this.props.data.updateState({book: value})
    }

    getBookItems() {
        if (this.state.bookList) {
            return this.state.bookList.map(item => {
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

    render() {
        const { classes, updateState, language, version, book } = this.props.data
        return (
            <Grid container xs={12}>
                <Grid item xs={4} md={2}>
                    <Paper className={classes.selectButtonPaper}>
                        <FormControl className={classes.formControl}>
                            <InputLabel htmlFor="select-language">Language</InputLabel>
                            <Select className={classes.selectMenu}
                                inputProps={{
                                    id: 'select-language'
                                }}
                                value={language}
                                onChange={(e) => this.setState({
                                    language: e.target.value,
                                    version: '',
                                    book: ''
                                }, () => updateState({language:e.target.value}))
                                }>
                                {this.displayLanguages(this.state.languageVersionData)}
                            </Select>
                        </FormControl>
                    </Paper>
                </Grid>
                <Grid item xs={4} md={2}>
                    <Paper className={classes.selectButtonPaper}>
                        <FormControl className={classes.formControl}>
                            <InputLabel htmlFor="select-version">Version</InputLabel>
                            <Select
                                className={classes.selectMenu}
                                value={version}
                                onChange={(e) => this.setState({
                                    version: e.target.value,
                                    book: ''
                                }, () => { this.onVersionSelection(e.target.value) })}
                                inputProps={{
                                    id: 'select-version',
                                }}
                            >
                                {this.displayVersions(this.state.language)}
                            </Select>
                        </FormControl>
                    </Paper>
                </Grid>
                <Grid item xs={4} md={2}>
                    <Paper className={classes.selectButtonPaper}>
                        <FormControl className={classes.formControl}>
                            <InputLabel htmlFor="select-book">Books</InputLabel>
                            <Select
                                className={classes.selectMenu}
                                value={book}
                                onChange={(e) => this.setState({
                                    book: e.target.value
                                }, () => { this.onBookSelection(e.target.value) })}
                                inputProps={{
                                    id: 'select-book',
                                }}
                            >
                                {this.getBookItems()}
                            </Select>
                        </FormControl>
                    </Paper>
                </Grid>
            </Grid>
        )
    }
}


export default MenuBar;