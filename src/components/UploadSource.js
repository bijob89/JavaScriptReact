import React, { Component } from 'react';
import {
    Grid,
    Paper,
    TextField,
    FormControl,
    InputLabel,
    MenuItem,
    Select,
    Table,
    TableBody,
    TableHead,
    TableRow,
    TableCell,
    TableFooter,
    TablePagination,
    Button,
    Divider,
    Typography

} from '@material-ui/core';
var grammar = require('usfm-grammar');


export default class UploadSource extends Component {
    constructor(props) {
        super(props)
        var fileReader;
        this.fileReader = fileReader

    }
    state = {
        versionDetails: [],
        languageDetails: [],
        contentDetails: [],
        versioncontentcode: 'irv',
        versioncontentdescription: 'Indian Revised Version',
        contenttype: 'bible',
        year: '2019',
        license: 'CC BY SA',
        revision: '3.0',
        languageid: '',
        contentid: '',
        languagename: 'hindi',
        fileContent: '',
        parsedUsfm:''
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

    async getContentTypesData() {
        const data = await fetch('http://localhost:8000/v1/contentdetails', {
            method: 'GET'
        })
        const contentDetails = await data.json()
        this.setState({ contentDetails })
    }

    componentDidMount() {
        this.getVersionData()
        this.getLanguagesData()
        this.getContentTypesData()
    }

    displayLanguage = () => {
        return this.state.languageDetails.map(lang => {
            return (
                <MenuItem key={lang.languageId} value={lang.languageName}>{lang.languageName}</MenuItem>
            )
        })
    }

    displayContentType = () => {
        return this.state.contentDetails.map(cont => {
            return (
                <MenuItem key={cont.contentId} myVal={"Hello"} value={cont.contentType}>{cont.contentType}</MenuItem>
            )
        })
    }

    setLanguage = e => {
        const value = this.state.languageDetails.filter((item) => {
            return item.languageName === e.target.value
        })
        this.setState({ languagename: e.target.value, languageid: value[0].languageId })
        // c
    }

    setContent = e => {
        const value = this.state.contentDetails.filter((item) => {
            return item.contentType === e.target.value
        })
        console.log(value[0]);
        this.setState({ contentid: value[0].contentId, contenttype: e.target.value });
    }


    uploadFile = e => {
        e.preventDefault();
        console.log('during upload":', e.target.files)
        console.log(e.target.files[0])
        console.log("hello")
    }

    handleFileRead = (e) => {
        const content = this.fileReader.result;
        var jsonOutput = grammar.parse(content)
        this.setState({ fileContent: content, parsedUsfm:jsonOutput })
    };

    handleFileChosen = (file) => {
        this.fileReader = new FileReader();
        this.fileReader.onloadend = this.handleFileRead;
        // console.log("Home")
        this.fileReader.readAsText(file)

    };

    async submitVersionDetails(){
        // var formData = new FormData();
        var apiData = {
            'language':this.state.languagename,
            'contentType': this.state.contenttype,
            'versionContentCode': this.state.versioncontentcode,
            'versionContentDescription': this.state.versioncontentdescription,
            'year': this.state.year,
            'revision': this.state.revision,
            'license': this.state.license,
            'wholeUsfmText': this.state.fileContent,
            'parsedUsfmText':this.state.parsedUsfm
        }
        console.log(apiData)
        const postVersions = await fetch('http://127.0.0.1:8000/v1/uploadsources', {
            method:'POST',
            body: JSON.stringify(apiData)
        })
        const myJson = await postVersions.json()
        console.log(myJson)

    }

    handleSubmit = e => {
        // e.preventDe  fault();
        this.submitVersionDetails()
    };

    render() {
        console.log(this.state)
        const { classes } = this.props
        var jsonOutput = grammar.parse(this.state.fileContent)
        console.log(jsonOutput)
        return (
            <Grid container item xs={11}>
                <Grid item xs={12} md={4}>
                    <Paper className={classes.versionUpdate}>

                        <Typography variant="h5" color="inherit" align="center" className={classes.typeG}>
                            Enter details
                        </Typography>

                        <Divider />
                        {/* <form className={classes.form} onSubmit={this.handleSubmit}> */}
                            <Grid container item xs={12}>
                                <Grid item xs={6} className={classes.versionTextField}>
                                    <TextField
                                        onChange={(e) => this.setState({ versioncontentdescription: e.target.value })}
                                        id="version-content-description"
                                        label="Version Content Description"
                                        className={classes.textField}
                                        margin="normal"
                                        variant="outlined"
                                    />
                                </Grid>
                                <Grid item xs={6} className={classes.versionTextField}>
                                    <TextField
                                        onChange={(e) => this.setState({ versioncontentcode: e.target.value })}
                                        id="version-code"
                                        label="Version Content Code"
                                        className={classes.textField}
                                        margin="normal"
                                        variant="outlined"
                                    />
                                </Grid>
                            </Grid>
                            <Grid container item xs={12}>
                                <Grid item xs={6} className={classes.versionTextField}>
                                    <TextField
                                        onChange={(e) => this.setState({ year: e.target.value })}
                                        id="year"
                                        label="Year"
                                        className={classes.input}
                                        margin="normal"
                                        variant="outlined"
                                    />

                                </Grid>
                                <Grid item xs={6} className={classes.versionTextField}>
                                    <TextField
                                        onChange={(e) => this.setState({ revision: e.target.value })}
                                        id="revision"
                                        label="Revision"
                                        className={classes.textField}
                                        margin="normal"
                                        variant="outlined"
                                    />

                                </Grid>
                            </Grid>
                            <Grid container item xs={12}>
                                <Grid item xs={6} className={classes.versionTextField}>
                                    <TextField
                                        onChange={(e) => this.setState({ license: e.target.value })}
                                        id="licence"
                                        label="Version Content Description"
                                        className={classes.textField}
                                        margin="normal"
                                        variant="outlined"
                                        defaultValue="CC BY SA"
                                    />

                                </Grid>
                            </Grid>
                            <Divider />
                            <Grid container item xs={12}>
                                <Grid item xs={6} className={classes.versionTextField}>
                                    <FormControl className={classes.formControl}>
                                        <InputLabel htmlFor="select-language">Language</InputLabel>
                                        <Select
                                            value={this.state.languagename}
                                            className={classes.selectMenu2}
                                            // onChange={e => this.setState({
                                            //     languageid:e.target.getAttribute('key'), 
                                            //     languagename:e.target.value
                                            // })}
                                            variant="outlined"
                                            onChange={this.setLanguage}
                                            inputProps={{
                                                name: 'language',
                                                id: 'select-language'
                                            }}
                                        >
                                            {this.displayLanguage()}
                                        </Select>
                                    </FormControl>

                                </Grid>
                                <Grid item xs={6} className={classes.versionTextField}>
                                    <FormControl className={classes.formControl}>
                                        <InputLabel htmlFor="select-content">Content Type</InputLabel>
                                        <Select
                                            value={this.state.contenttype}
                                            className={classes.selectMenu2}
                                            // onChange={(e) => this.setState({
                                            //     contentid:e.target.getAttribute('key'),
                                            //     contenttype:e.target.value
                                            // })}
                                            variant="outlined"
                                            onChange={this.setContent}
                                            inputProps={{
                                                name: 'content',
                                                id: 'select-content',
                                            }}
                                        >
                                            {this.displayContentType()}
                                        </Select>
                                    </FormControl>
                                    {/* <Divider /> */}
                                </Grid>
                                <br />
                            </Grid>
                            <Divider />
                            {/* <Paper className={classes.paper}> */}
                            {/* Update Tokens */}

                            <Grid item xs={12} className={classes.uploadGrid}>
                                <InputLabel htmlFor="upload-source" className={classes.uploadLabel} >Choose Files
                            </InputLabel>
                            </Grid>
                            <Button variant="raised" color="inherit" className={classes.button} onClick={this.handleSubmit}>Upload</Button>
                            <TextField type="file" variant="outlined"
                                id="upload-source"
                                style={{ visibility: 'hidden' }}
                                onChange={e => this.handleFileChosen(e.target.files[0])}
                            ></TextField>
                        {/* </form> */}

                    </Paper>
                </Grid>
                <Grid item xs={12} md={8}>
                    <Paper className={classes.versionDisplay}>

                        {/* <br /> */}
                        <Typography variant="h5" color="primary" align="center" className={classes.typeG}>
                            View Sources
                        </Typography>
                        {/* <br /> */}
                        <Divider />
                        <Table className={classes.table}>
                            <TableHead>
                                <TableRow>
                                    <TableCell>Version Content Description</TableCell>
                                    <TableCell align="right">Version Content Code</TableCell>
                                    <TableCell align="right">Year</TableCell>
                                    <TableCell align="right">License</TableCell>
                                    <TableCell align="right">Revision</TableCell>
                                    <TableCell align="right">Content Type</TableCell>
                                    <TableCell align="right">Language</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {this.state.versionDetails.map(row => (
                                    <TableRow key={row.versionid}>
                                        <TableCell align="right">{row.versioncontentdescription}</TableCell>
                                        <TableCell align="right">{row.versioncontentcode}</TableCell>
                                        <TableCell align="right">{row.year}</TableCell>
                                        <TableCell align="right">{row.license}</TableCell>
                                        <TableCell align="right">{row.revision}</TableCell>
                                        <TableCell align="right">{row.contenttype}</TableCell>
                                        <TableCell align="right">{row.languagename}</TableCell>
                                    </TableRow>
                                ))}
                                {/* {rows.map(row => (
                                    <TableRow key={row.name}>
                                        <TableCell component="th" scope="row">
                                            {row.name}
                                        </TableCell>
                                        <TableCell align="right">{row.calories}</TableCell>
                                        <TableCell align="right">{row.fat}</TableCell>
                                        <TableCell align="right">{row.carbs}</TableCell>
                                        <TableCell align="right">{row.protein}</TableCell>
                                    </TableRow>
                                ))} */}
                            </TableBody>
                            <TableFooter>
                                <TableRow>
                                    <TablePagination
                                        rowsPerPageOptions={[5, 10, 25]}
                                        colSpan={3}
                                        count={3}
                                        rowsPerPage={3}
                                        page={''}
                                        SelectProps={{
                                            native: true,
                                        }}
                                    />
                                </TableRow>
                            </TableFooter>
                        </Table>
                    </Paper>
                </Grid>

            </Grid>
        )
    }
}
