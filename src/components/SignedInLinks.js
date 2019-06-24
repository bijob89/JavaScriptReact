import React from 'react';
import { Tab } from '@material-ui/core';
// import { List } from '@material-ui/core';
import { Tabs } from '@material-ui/core';
// import { Link } from '@material-ui/core';
import { Redirect } from 'react-router-dom';

function LinkTab(props) {
    return <Tab component="a" onClick={event => event.preventDefault()} {...props} />;
}

const SignedInLinks = () => {
    return (
        <Tabs style={{ float: 'right' }}>
        {/* <ul> */}
            {/* <Link to="/upload">Upload</Link>
            <Link to="/homepage">Homepage</Link> */}
        {/* </ul> */}
        
        {/* <Link to="/homepage">Homepage</Link> */}
            <Tab label="Upload" onClick={e => <Redirect to='/upload' />}/>
            <Tab label="Download" />
            <Tab label="Translation" />
            <Tab label="Sign out" />
        </Tabs>
    )
}

export default SignedInLinks;