import React, { Component } from 'react';
import {
    Grid,
    TextField,
    Button,
    CssBaseline,
    FormControlLabel,
    Checkbox,
    Link,
    Typography,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    Slide
} from '@material-ui/core';
import Container from '@material-ui/core/Container';
import { Redirect } from 'react-router-dom';

export default class LoginPage extends Component {
    state = {
        redirect: false,
        message: '',
        email: '',
        password: '',
        forgotPasswordDailogOpen: false,
        verificationCodeDialogOpen: false,
        dialogEmail:'',
        verificationCode:''
    }

    async authenticate() {
        var formData = new FormData();
        var apiData = {
            email: this.state.email,
            password: this.state.password
        }
        for (var name in apiData) {
            formData.append(name, apiData[name])
        }

        const data = await fetch('http://127.0.0.1:8000/v1/auth', {
            method: "POST",
            body: formData
        })
        const myJson = await data.json()
        // console.log(myJson.message)
        if ('access_token' in myJson) {
            localStorage.setItem('access_token', myJson.access_token)
            this.setState({ redirect: true })
        } else {
            alert(myJson.message)
        }


    }

    async forgotPassword(){
        var formData = new FormData();
        var apiData = {
            email:this.state.dialogEmail
        }
        for (var name in apiData) {
            formData.append(name, apiData[name])
        }
        const data = await fetch('http://127.0.0.1:8000/v1/resetpassword', {
            method:'POST',
            body: formData
        })
        const myJson = await data.json()
        console.log(myJson)
        if (myJson.success){
            this.setState({message:myJson.message, forgotPasswordDailogOpen:false, verificationCodeDialogOpen:true})
        }else{
            alert(myJson.message)
        }
    }

    handleLoginSubmit = (e) => {
        e.preventDefault();
        this.authenticate()

        // this.setState({redirect:true})
    }

    handleClose = () => {
        this.setState({forgotPasswordDailogOpen:false, verificationCodeDialogOpen:false})
    }

    handleOpen = () => {
        this.setState({forgotPasswordDailogOpen: true})
    }

    handleSend = (e) => {
        e.preventDefault();
        this.forgotPassword();
    }
    render() {
        console.log(this.state)
        const { redirect } = this.state
        if (redirect) {
            return <Redirect to='/homepage' />
        }
        const { classes } = this.props
        return (
            <Container component="main" maxWidth="xs" className={classes.loginPage}>
                {/* <Paper className={classes.loginPage}> */}
                {/* <CssBaseline /> */}
                <Typography component="h1" variant="h5">
                    Sign in
                </Typography>
                <form className={classes.form} onSubmit={this.handleLoginSubmit}>
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="email"
                        type="email"
                        label="Email Address"
                        name="email"
                        autoComplete="email"
                        onChange={(e) => this.setState({ email: e.target.value })}
                    // autoFocus
                    />
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="password"
                        label="Password"
                        name="password"
                        type="password"
                        autoComplete="current-password"
                        autoFocus
                        onChange={(e) => this.setState({ password: e.target.value })}
                    />
                    <FormControlLabel
                        control={<Checkbox value="remember" color="primary" />}
                        label="Remember me"
                    />
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                    // className={classes.submit}
                    >
                        Sign In
                </Button>
                </form>
                <Grid container style={{ marginTop: "7px" }}>
                    <Grid item xs>
                        <Link variant="body2" onClick={this.handleOpen} className={classes.forgot}>
                            Forgot password?
                        </Link>
                    </Grid>
                    <Grid item>
                        <Link href="/signup" variant="body2">
                            {"Don't have an account? Sign Up"}
                        </Link>
                    </Grid>
                </Grid>
                <Dialog
                    open={this.state.forgotPasswordDailogOpen}
                    onClose={this.handleClose}
                    aria-labelledby="form-dialog-title"
                >
                    <DialogTitle id="form-dialog-title">Forgot Password</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            Enter your registered email id. An Email with a verification code
                            will be sent to this email id.
                        </DialogContentText>
                        <TextField
                            autoFocus
                            margin="dense"
                            id="name"
                            label="Email Address"
                            type="email"
                            fullWidth
                            onChange={(e) => this.setState({dialogEmail:e.target.value})}
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.handleClose} color="primary">
                            Close
                        </Button>
                        <Button onClick={this.handleSend} color="primary">
                            Send
                        </Button>
                    </DialogActions>
                </Dialog>
                <Dialog
                    open={this.state.verificationCodeDialogOpen}
                    // onClose={this.handleClose}
                    aria-labelledby="form-dialog-title"
                >
                    <DialogTitle id="form-dialog-title">Enter Verification Code</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            {this.state.message}
                            <br />
                            Enter the code recieved.
                        </DialogContentText>
                        <TextField
                            autoFocus
                            margin="dense"
                            id="name"
                            label="Verification Code"
                            fullWidth
                            onChange={(e) => this.setState({verificationCode:e.target.value})}
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.handleVerificationCode} color="primary">
                            Submit
                        </Button>
                    </DialogActions>
                </Dialog>
                {/* </Paper> */}
            </Container>
        )
    }
}


// export default LoginPage;