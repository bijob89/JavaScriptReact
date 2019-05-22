import React, { Component, Fragment } from 'react';
import ConcordanceBooks from './ConcordanceBooks';
import { List, ListItem, Divider, Paper, Grid } from '@material-ui/core';


class Translations extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedToken: '',
            usfmTextList: '',
            usfmTextFlag: this.props.data.usfmTextFlag
        }  
    }

    async getVerseText(token) {
        const { language, book} = this.props.data
        const data = await fetch('http://127.0.0.1:8000/v1/concordances/' + language + '/' + book + '/' + this.state.selectedToken, {
            method:'GET'
        })
        const myJson = await data.json()
        await this.setState({usfmTextList:myJson, usfmTextFlag:true})
    }

    handleClick = e => {
        var word = e.target.getAttribute('value')
        this.setState({selectedToken: word, usfmTextList:'', usfmTextFlag: false}, () => this.getVerseText(word))
    }

    componentWillReceiveProps(){
        this.setState({
            selectedToken: '',
            usfmTextList: '',
            usfmTextFlag: this.props.data.usfmTextFlag
        })
    }

    getTokens() {
        // console.log("trans", this.props)
        if(this.props.data.book){
            return this.props.data.tokenList.map(item => {
                return (
                   <div key={item}>
                    <ListItem button
                    key={item} 
                    name={item} 
                    value={item} 
                    onClick={this.handleClick}>{item}</ListItem><Divider /></div>
                )
            })
        }else if(this.props.data.version){
            return <ListItem key="" button>Select Book to load Tokens<Divider /></ListItem>
        }else if(this.props.data.language){
            return <ListItem key="" button>Select Version, Book to load Tokens <Divider /></ListItem>
        }else {
            return <ListItem key="" button>Select Language, Version, Book to load Tokens <Divider /></ListItem>
        }
        
    }

    render() {
        console.log("state",this.state)
        // console.log("props",this.props)
        return (
            <Fragment>
                <Grid container spacing={24}>
                    <Grid  item xs={4}>
                    <Paper className={this.props.data.classes.tokenList}>
                        <List >
                            {this.getTokens()}
                        </List>
                        </Paper>
                    </Grid>
                    <ConcordanceBooks data={{
                        classes: this.props.data.classes,
                        language: this.props.data.language,
                        version: this.props.data.version,
                        usfmTextList: this.state.usfmTextList,
                        selectedToken: this.state.selectedToken,
                        book:this.props.data.book,
                        usfmTextFlag: this.state.usfmTextFlag
                    }} />
                </Grid>
            </Fragment>
        )
    }
}

export default Translations;