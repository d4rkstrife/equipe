import React, { Component, Fragment } from 'react';
import firebase from 'firebase';

class SignIn extends Component {
    constructor(props) {
        super(props)
        this.state = {
            mail: '',
            password: '',
            error: ''
        }
        this.handleChangeMail = this.handleChangeMail.bind(this);
        this.handleChangePassword = this.handleChangePassword.bind(this);
        this.firebaseLogin = this.firebaseLogin.bind(this);
    }
    render() {
        return (

            <Fragment>
                <form>
                    <label htmlFor="mail">mail:</label> <input id="mail" type="text" name="username" autoComplete="username" value={this.state.mail} onChange={this.handleChangeMail} required></input>
                    <label htmlFor="password">password:</label> <input id="password " type="password" name="password" autoComplete="current-password" value={this.state.password} onChange={this.handleChangePassword} required></input>
                    <button className="pink_button" type="submit" onClick={this.firebaseLogin}>Login</button>
                </form>
                <p>{this.state.error}</p>
            </Fragment>

        );
    }
    firebaseLogin(event) {
        let that = this
        event.preventDefault();
        firebase.auth().signInWithEmailAndPassword(this.state.mail, this.state.password)
            .catch(function (error) {
                // Handle Errors here.
                that.setState({ error: error.message })
                console.log(error.code, error.message)
                // ...
            });

    }
    handleChangeMail(event) {
        this.setState({ mail: event.target.value });
    }
    handleChangePassword(event) {
        this.setState({ password: event.target.value });
    }
}

export default SignIn;