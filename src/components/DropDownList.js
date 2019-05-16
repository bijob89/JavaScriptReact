import React, { Component } from "react";
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import  MenuBar from './MenuBar'



class DropDownList extends Component {
    state = {
        value: '',
        open: false,
        setstate:{}
    };

    handleChange = event => {
        this.setState({ [event.target.name]: event.target.value });
    };

    handleClose = () => {
        this.setState({ open: false });
    };

    handleOpen = () => {
        this.setState({ open: true });
    }

    getMenuItems(value) {
        var dataValue;
        if(value.language === ''){
            dataValue = value.languageArray
        }else if(value.version === ''){
            dataValue = []
            // var language = value.language
            value.languageVersionData.this.state.value.map(item => dataValue.push(item.version))
        }
        return dataValue.map(item => {
            return (
                <MenuItem key={item} value={item}>{item}</MenuItem>
            )
        })
    }

    render() {
        return (
            <FormControl>
                <InputLabel id={this.props.data.classes.inputLabel} htmlFor="formatted-text-mask-input">{this.props.data.label}</InputLabel>

                <Select
                    id="formatted-text-mask-input"
                    open={this.state.open}
                    onClose={this.handleClose}
                    onOpen={this.handleOpen}
                    value={this.state.value}
                    onChange={(e) => this.setState({value:e.target.value})}
                >
                    <MenuItem value="">
                        <em>None</em>
                    </MenuItem>
                    {this.getMenuItems(this.props.data)}
                    {/* {MenuBar.setMenuState(this.state.value)} */}
                </Select>
                {console.log(this.state.value)}
            </FormControl>
        )
    }
}


export default DropDownList;