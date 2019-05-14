import React, { Component } from "react";
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import { arrayOf } from "prop-types";
// import { async } from "q";



class DropDownList extends Component {
    state = {
        age: '',
        open: false,
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
        //  console.log( (Array.of(value))[0]);
        //  console.log(Object.values(value) )
        //  console.log(Object.keys(value) )

        // console.log(Array.of( this.props.data)) 
        // console.log(Array.of( this.props.data).length)

           console.log(this.props.data) 
           console.log(this.props.data.length)


        //   Array.of( this.props.data)["0"].forEach((item,index) =>{
              
        //     console.log(item)
        //     console.log(index)
        //   } 
        // );
        return value.map(item => {
            return (
                <option>{item.lang}</option>
            )
        })
    }

    render() {
        return (
            <FormControl>
                <InputLabel htmlFor="demo-controlled-open-select">Age</InputLabel>

                {/* <Select
                    open={this.state.open}
                    onClose={this.handleClose}
                    onOpen={this.handleOpen}
                    value={this.state.age}
                    onChange={this.handleChange}
                >
                    <MenuItem value="">
                        <em>None</em>
                    </MenuItem>
                    <MenuItem value={1}>
                        <em>One</em>
                    </MenuItem>
                    {this.getMenuItems(this.props.data)}
                </Select> */}
                <select>
                    <option>Any</option>
                    {this.getMenuItems(this.props.data)}
                </select>
            </FormControl>
        )
    }
}


export default DropDownList;