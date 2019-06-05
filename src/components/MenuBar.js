import React, { Component } from 'react';
import { FormControl, Grid, Paper, MenuItem, Select, InputLabel } from '@material-ui/core';
import './css/style.css'

class MenuBar extends Component {
    state = {
            languageVersionData: {},
            languagesList:[],
            language: '',
            version: '',
            bookList: '',
            book: '',
            targetLanguage:'',
            versionDetails:[],
            languageDetails:[],
            versionid:''
    }

    async getVersionData() {
        const data = await fetch('http://localhost:8000/v1/versiondetails', {
            method: 'GET'
        })
        const versionDetails = await data.json()
        this.setState({ versionDetails })
    }

    async getLanguagesData() {
        const data = await fetch('http://localhost:8000/v1/languages', {
            method: 'GET'
        })
        const languageDetails = await data.json()
        this.setState({ languageDetails })
    }



    displayLanguage = () => {
        return this.state.versionDetails.map(lang => {
            return (
                <MenuItem key={lang.versionid} value={lang.languagename}>{lang.languagename}</MenuItem>
            )
        })
    }

    displayVersions(language) {
        if (!language) {
            return <MenuItem key="" value="" disabled>Loading Versions</MenuItem>
        }
        const versions = this.state.versionDetails.filter((ver) => {
            return ver.languagename === this.state.language
        })
        return versions.map(item => {
            return <MenuItem key={item.versionid} value={item.versioncontentcode}>{item.versioncontentcode.toUpperCase()}</MenuItem>
        })
    }


    getTargetLanguage(){
        if(!this.state.book){
            return <MenuItem disabled>Load Book to get Language data</MenuItem>
        }
        if(!this.state.languagesList){
            return <MenuItem disabled>Loading</MenuItem>
        }else{
            return this.state.languageDetails.map(lang => {
                return (
                    <MenuItem key={lang.languageId} value={lang.languageName}>{lang.languageName}</MenuItem>
                )
            })
            
        }
    }

    componentDidMount() {
        this.getVersionData()
        this.getLanguagesData()
    }

    async getTokenList() {
        var book = await fetch('http://127.0.0.1:8000/v1/tokenlist/' + this.state.versionid + '/' + this.state.book, {
            method: 'GET'
        })
        const tokenList = await book.json();
        this.props.data.updateState({tokenList: tokenList})
    }

    async getBooks() {
        const version =  this.state.versionDetails.filter((ver) => {
            return ver.languagename === this.state.language && ver.versioncontentcode === this.state.version && ver.contenttype === 'bible'
        })
        const versionid = version[0].versionid
        var book = await fetch('http://127.0.0.1:8000/v1/books/' + versionid, {
            method: 'GET'
        })
        const mJson = await book.json();
        this.setState({
            bookList: mJson,
            versionid:versionid
        })
        this.props.data.updateState({versionid:versionid})

    }
    
    onVersionSelection = (value) => {
        // console.log('state', this.state.versionid)
        this.getBooks()
        this.props.data.updateState({version: value})
    }

    onBookSelection = (value) => {
        this.getTokenList()
        this.props.data.updateState({book: value})
    }

    onTargetLanguageSelection = (value) => {
        const selectedLanguage = this.state.languageDetails.filter((item) => {
            return item.languageName === value
        })
        this.props.data.updateState({targetLanguage: value})
        this.props.data.updateState({targetLanguageId: selectedLanguage[0].languageId})
        // ({ languagename: value, languageid: value[0].languageId })
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
                <MenuItem key="" value="" disabled>Loading Book</MenuItem>
            )
        }
    }

    render() {
        const { classes, updateState, language, version, book } = this.props.data
        console.log(this.state)
        return (
            <Grid container item xs={12}>
                <Grid item xs={3} md={2}>
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
                                {this.displayLanguage()}
                            </Select>
                        </FormControl>
                    </Paper>
                </Grid>
                <Grid item xs={3} md={2}>
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
                <Grid item xs={3} md={2}>
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
                <Grid item xs={3} md={2}>
                    <Paper className={classes.selectButtonPaper}>
                        <FormControl className={classes.formControl}>
                            <InputLabel htmlFor="select-target-language">Target</InputLabel>
                            <Select
                                className={classes.selectMenu}
                                value={this.state.targetLanguage}
                                onChange={(e) => this.setState({
                                    targetLanguage: e.target.value
                                }, () => { this.onTargetLanguageSelection(e.target.value) })}
                                inputProps={{
                                    id: 'select-target-language',
                                }}
                            >
                                {this.getTargetLanguage()}
                            </Select>
                        </FormControl>
                    </Paper>
                </Grid>
            </Grid>
        )
    }
}


export default MenuBar;