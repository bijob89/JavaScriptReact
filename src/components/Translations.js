import React, { Component, Fragment } from 'react';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import { Select, MenuItem } from '@material-ui/core';
import InputLabel from '@material-ui/core/InputLabel';
import ConcordanceBooks from './ConcordanceBooks';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
// var grammar = require('usfm-grammar')


class Translations extends Component {
    // console.log(props)
    constructor(props) {
        super(props);
        this.state = {
            selectedToken: '',
            usfmTextList: [],
            token:''
        }
    }

    async getVerseText(token) {
        // const data = fetch('', {
        //     method:'GET'
        // })
        // const myJson = data.json()
        const verse = [
        "\v 1 దేవుడు ఎన్నుకున్న వారి విశ్వాసాన్ని స్థిరపరచడం కోసం, వారు దైవ భక్తికి అనుగుణమైన సత్యం గురించిన ఎరుకలో నిలకడగా ఉండేలా, మన ",
        "\v 2 అబద్ధమాడలేని దేవుడు కాలానికి ముందే వాగ్దానం చేసిన శాశ్వత జీవం గురించిన నిశ్చయతలో పౌలు అనే నేను దేవుని సేవకుణ్ణి, యేసు క్రీస్తు అపొస్తలుణ్ణి. మన",
        "\v 3 సరైన సమయంలో అయన ఇప్పుడు మన రక్షకుడైన దేవుని ఆజ్ఞ ప్రకారం నాకు అప్పగించిన సందేశం వలన తన వాక్కును వెల్లడి చేశాడు. \p ",
        "\v 4 మన అందరి ఉమ్మడి విశ్వాసం విషయంలో నా సొంత కుమారుడు తీతుకు రాస్తున్న లేఖ. తండ్రియైన దేవుని నుండీ, మన రక్షకుడైన క్రీస్తు యేసు నుండీ కృప, కరుణ, శాంతి సమాధానాలు నీకు కలుగు గాక. \p \v "
        ]
        this.setState({usfmTextList:verse})
    }

    handleClick = e => {
        // console.log(e.target.getAttribute('value'))
        var word = e.target.getAttribute('value')
        this.setState({selectedToken: word}, () => this.getVerseText(word))
    }

    getTokens() {
        return this.props.data.tokenList.map(item => {
            return (
                // <ListItem key={item} name={item} value={item} onClick={(e) => this.setState({token:e.target.value})}>{item}</ListItem>
                <div>
                <ListItem button
                key={item} 
                name={item} 
                value={item} 
                onClick={this.handleClick}>{item}</ListItem><Divider /></div>
            )
        })
    }

    // getVerse(){
    //     const verse = `
    //     \v 1 దేవుడు ఎన్నుకున్న వారి విశ్వాసాన్ని స్థిరపరచడం కోసం, వారు దైవ భక్తికి అనుగుణమైన సత్యం గురించిన ఎరుకలో నిలకడగా ఉండేలా, మన 
    //     \v 2 అబద్ధమాడలేని దేవుడు కాలానికి ముందే వాగ్దానం చేసిన శాశ్వత జీవం గురించిన నిశ్చయతలో పౌలు అనే నేను దేవుని సేవకుణ్ణి, యేసు క్రీస్తు అపొస్తలుణ్ణి. మన
    //     \v 3 సరైన సమయంలో అయన ఇప్పుడు మన రక్షకుడైన దేవుని ఆజ్ఞ ప్రకారం నాకు అప్పగించిన సందేశం వలన తన వాక్కును వెల్లడి చేశాడు. \p 
    //     \v 4 మన అందరి ఉమ్మడి విశ్వాసం విషయంలో నా సొంత కుమారుడు తీతుకు రాస్తున్న లేఖ. తండ్రియైన దేవుని నుండీ, మన రక్షకుడైన క్రీస్తు యేసు నుండీ కృప, కరుణ, శాంతి సమాధానాలు నీకు కలుగు గాక. \p \v 
    //     `
    // }

    render() {
        console.log("token",this.state)
        return (
            // <Grid container spacing={24}>
            <Fragment>

                {/* </div> */}
                <Grid container spacing={24}>
                    <Grid  item xs={4}>
                    <Paper className={this.props.data.classes.tokenList}>
                        <List >
                        {/* <ul> */}
                            {/* <li className={this.props.data.classes.li}>one</li> */}
                            {this.getTokens()}
                        </List>
                        {/* </ul> */}
                        </Paper>
                    </Grid>
                    {/* </Paper> */}
                    {/* </Grid> */}
                    <ConcordanceBooks data={{
                        classes: this.props.data.classes,
                        language: this.props.data.language,
                        version: this.props.data.version,
                        usfmTextList: this.state.usfmTextList,
                        selectedToken: this.state.selectedToken
                    }} />
                    {/* </Grid> */}
                </Grid>
            </Fragment>
        )
    }
}

export default Translations;