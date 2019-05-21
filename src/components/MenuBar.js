import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Translations from './Translations';
import './css/style.css'
// import DropDownList from './DropDownList';



class MenuBar extends Component {
    constructor(props) {
        super(props)
        this.state = {
            // languageArray: [],
            languageVersionData: {},
            language: '',
            version: '',
            bookList: '',
            book: '',
            tokenList: [],
            selectedToken: '',
            usfmText: ''
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
    // componentWillUnmount(){

    // }
    getLanguages(value) {
        var languages = Object.keys(value);
        return languages.map(item => {
            return (
                <MenuItem key={item} value={item}>{item}</MenuItem>
            )
        })
    }

    getVersions(language) {
        if (!language) {
            return <MenuItem key="" value="">Loading Versions</MenuItem>
        }
        // this.getBooks()
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

        var getUsfm = await fetch('http://127.0.0.1:8000/v1/usfmtexts/' + this.state.language + '/' + this.state.version + '/' + this.state.book, {
            method: 'GET'
        })
        const usfmJson = await getUsfm.json();
        const usfmText = usfmJson[this.state.book]

        // var jsonOutput = grammar.parse(usfmText)
        this.setState({
            tokenList,
            usfmText
        })
    }
    getBookItems() {
        // this.getBooks()
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
        return (
            <Grid className={this.props.classes.mainGrid} container spacing={24}>
                <Grid item xs={4} md={2}>
                
                    <Paper className={this.props.classes.selectButtonPaper}>
                    <FormControl className={this.props.classes.formControl}>
                        <InputLabel htmlFor="select-language">Language</InputLabel><br/>
                        <Select
                            className={this.props.classes.selectMenu}
                            // id="formatted-text-mask-input"
                            value={this.state.language}
                            onChange={(e) => this.setState({ language: e.target.value })}
                            inputProps={{
                                id: 'select-language',
                            }}
                        >
                            {this.getLanguages(this.state.languageVersionData)}
                        </Select>
                        </FormControl>
                    </Paper>
                </Grid>
                <Grid item xs={4} md={2}>
                    <Paper className={this.props.classes.selectButtonPaper}>
                    <FormControl className={this.props.classes.formControl}>
                        <InputLabel htmlFor="select-version">Version</InputLabel><br/>
                        <Select
                            className={this.props.classes.selectMenu}
                            value={this.state.version}
                            onChange={(e) => this.setState({ version: e.target.value }, () => { this.getBooks() })}
                            inputProps={{
                                id: 'select-version',
                            }}
                        >
                            {this.getVersions(this.state.language)}
                        </Select>
                        </FormControl>
                    </Paper>
                </Grid>
                <Grid item xs={4} md={2}>
                    <Paper className={this.props.classes.selectButtonPaper}>
                    <FormControl className={this.props.classes.formControl}>
                        <InputLabel htmlFor="select-book">Book</InputLabel><br/>
                        <Select
                            className={this.props.classes.selectMenu}
                            value={this.state.book}
                            onChange={(e) => this.setState({ book: e.target.value }, () => { this.getTokenList() })}
                            inputProps={{
                                id: 'select-book',
                            }}
                        >
                            {this.getBookItems()}

                        </Select>
                        </FormControl>
                    </Paper>
                </Grid>
                
                   
                <Translations data={{
                    classes: this.props.classes,
                    books: this.state.books,
                    language: this.state.language,
                    version: this.state.version,
                    tokenList: this.state.tokenList,
                    usfmText:this.state.usfmText
                }} />
            </Grid>
        )
    }
}


export default MenuBar;