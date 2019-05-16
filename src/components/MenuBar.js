import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Translations from './Translations';
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
            books:false
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


    async getBooks(){
        var book = await fetch('http://127.0.0.1:8000/v1/books/' + this.state.language + '/' + this.state.version, {
            method:'GET'
        })
        const mJson = await book.json();
        this.setState({
            bookList:mJson,
            books:true
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

    getVersions(language){
        if(!language){
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
        // this.getFullLanguageData()
        this.getLanguageData()
    }

    render() {
        return (
            <Grid container spacing={24}>
                {/* <FormControl> */}
                {/* <Grid item xs={12}> */}
                    <Grid item xs={2}>
                        <Paper className={this.props.classes.selectButton}>
                                {/* <DropDownList /> */}
                            <InputLabel id={this.props.classes.inputLabel} htmlFor="formatted-text-mask-input">Select Language</InputLabel>

                            <Select
                                id="formatted-text-mask-input"
                                value={this.state.language}
                                onChange={(e) => this.setState({ language: e.target.value })}
                            >
                                
                                {this.getLanguages(this.state.languageVersionData)}
                                {/* {MenuBar.setMenuState(this.state.value)} */}
                            </Select>

                        </Paper>
                    </Grid>
                    <Grid item xs={2}>
                        <Paper className={this.props.classes.selectButton}>                            
                        <InputLabel htmlFor="formatted-text-mask-input">Select Version</InputLabel>
                            <Select
                                // open={this.state.open}
                                // onClose={this.handleClose}
                                // onOpen={this.handleOpen}
                                value={this.state.version}
                                onChange={(e) => this.setState({ version: e.target.value }, () => {this.getBooks()})}
                            >
                            <InputLabel id={this.props.classes.inputLabel} htmlFor="formatted-text-mask-input">Select Version</InputLabel>
                                {this.getVersions(this.state.language)}
                                {/* {MenuBar.setMenuState(this.state.value)} */}
                            </Select>
                        </Paper>
                    </Grid>
                {/* </Grid> */}
                <Translations data={{
                    classes:this.props.classes,
                    bookList:this.state.bookList,
                    books:this.state.books,
                    language:this.state.language,
                    version:this.state.version
                    }}/>
            </Grid>
        )
    }
}


export default MenuBar;