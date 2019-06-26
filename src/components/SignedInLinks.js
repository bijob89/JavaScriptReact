import React from 'react';
import { Button } from '@material-ui/core';
import jwt_decode from 'jwt-decode';
import ButtonStyle from './ButtonStyle';
// import { Link } from 'react-router-dom'
// import { BrowserRouter as Router, Route, Link } from "react-router-dom"
import Routes from './Routes'
import { Typography } from '@material-ui/core';
import { Link } from '@material-ui/core';

let decoded;
let tokenAliveFlag;
var accessToken = localStorage.getItem('access_token')
if (accessToken) {
    decoded = jwt_decode(accessToken)
    let currentDate = new Date().getTime()
    let expiry = decoded.exp * 1000
    console.log(currentDate, expiry)
    var hours = Math.abs(expiry - currentDate) / 36e5
    if(hours > 0){
        console.log(hours)
        console.log("logged in")
        // this.setState({redirect:true})
        tokenAliveFlag = true
    }else{
        console.log("logged out")
    }
}

// function LinkTab(props) {
//     return <Tab component="a" onClick={event => event.preventDefault()} {...props} />;
// }

const SignedInLinks = () => {

    function  logOut(){
        localStorage.removeItem('access_token')
    }

    return (
        
        <div>
            {/* <Router> */}
        {(accessToken && decoded.role === 'sa' && tokenAliveFlag) ? (
            <div>
            
                
                <ButtonStyle data={{text:"Upload Souce", link:"/upload"}} />
                <ButtonStyle data={{text:"View Available Sources", link:"/viewsources"}} />
                <ButtonStyle data={{text:"Translation", link:"/homepage"}} />
                <ButtonStyle data={{text:"Download Draft", link:"/download"}} />
                <ButtonStyle data={{text:"Log Out", link:"/signin"}} />
                
            <Link
              color="inherit"
              noWrap
              key={"link"}
              variant="body2"
              href="/upload"
            //   className={classes.toolbarLink}
            >New Link</Link>
                </div>
            // </div>
            ) : (
                (accessToken && decoded.role === 'ad' && tokenAliveFlag) ? (
                    <div>
                        <ButtonStyle data={{text:"Upload Souce", link:"/upload"}} />
                        <ButtonStyle data={{text:"View Available Sources", link:"/upload"}} />
                        <ButtonStyle data={{text:"Translation", link:"/homepage"}} />
                        <ButtonStyle data={{text:"Download Draft", link:"/download"}} />
                        <ButtonStyle data={{text:"Log Out", link:"/signin"}} />
                    </div>
                ) : (
                    (accessToken && decoded.role === 'm' && tokenAliveFlag) ? (
                        <div>
                            <ButtonStyle data={{text:"View Available Sources", link:"/upload"}} />
                            <ButtonStyle data={{text:"Translation", link:"/homepage"}} />
                            <ButtonStyle data={{text:"Download Draft", link:"/download"}} />
                            <ButtonStyle data={{text:"Log Out", link:"/signin"}} />
                        </div>
                    ) : null
                )
            )}
            {/* </Router> */}
        </div>
        // </Grid>
    )
}

export default SignedInLinks;