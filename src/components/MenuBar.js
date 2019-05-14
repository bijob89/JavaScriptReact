import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import DropDownList from './DropDownList';
// import { async } from 'q';


// let data = fetch("https://stagingapi.autographamt.com/v1/languagelist").then(res => {return res})

// console.log(data.then(res => {return res}))
var itemArray = []
const getData = async () =>  {
    const result = await  fetch("https://stagingapi.autographamt.com/v1/languagelist", {
        method: 'GET'
    });
    const myJson = await result.json();
    //  console.log(myJson)
    for (var item in myJson){
        var obj = {
            lang:item,
            langc:myJson[item]
        }
        itemArray.push(obj)
    }
    //console.log(itemArray)
    //console.log(itemArray.length)
}

getData()

// console.log(getData())
class MenuBar extends Component {
    

    render() {
        return (
            <Grid container spacing={24}>
                <Grid item xs={2}>
                <Paper className={this.props.classes.selectButton}>
                    <DropDownList data={itemArray} />
                </Paper>
                </Grid>
                <Grid item xs={2}>
                <Paper className={this.props.classes.selectButton}>
                    {/* <DropDownList /> */}
                </Paper>
                </Grid>
                <Grid item xs={2}>
                <Paper className={this.props.classes.selectButton}>
                    {/* <DropDownList /> */}
                </Paper>
                </Grid>
            </Grid>
        )
    }
}


export default MenuBar;