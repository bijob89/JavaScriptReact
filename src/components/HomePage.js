import React, { Component } from 'react';
import { Grid } from '@material-ui/core';
import MenuBar from './MenuBar';
import TokenList from './TokenList';
import Concordance from './Concordance';

export default class HomePage extends Component {
    state = {
        language: '',
        version: '',
        book: '',
        tokenList: '',
        token: '',
        concordance: ''
    }

    updateState = (value) => {
        this.setState(value)
    }

    render() {
        const { classes } = this.props
        return (
            <Grid item xs={12}>
                <MenuBar data={{
                    updateState: this.updateState,
                    classes: classes,
                    language: this.state.language,
                    version: this.state.version,
                    book: this.state.book
                }} />
                <Grid container item xs={11}>
                    <Grid item xs={4}>
                        <TokenList data={{
                            updateState: this.updateState,
                            tokenList: this.state.tokenList,
                            book: this.state.book,
                            classes: classes,
                            language: this.state.language,
                            version: this.state.version
                        }} />
                    </Grid>
                    <Grid item xs={8}>
                        <Concordance data={{
                            classes:classes,
                            book: this.state.book,
                            concordance:this.state.concordance,
                            token: this.state.token
                        }} />
                    </Grid>
                </Grid>
            </Grid>
        )
    }
}
