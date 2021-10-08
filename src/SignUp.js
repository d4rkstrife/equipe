import React, { Component, Fragment } from 'react';
import firebase from 'firebase'
class SignUp extends Component {
    constructor(props) {
        super(props)
        this.state = {
            nom: '',
            mail: '',
            password: '',
            error: ''
        }
        this.handleChangeNom = this.handleChangeNom.bind(this);
        this.handleChangeMail = this.handleChangeMail.bind(this);
        this.handleChangePassword = this.handleChangePassword.bind(this);
        this.firebaseCreate = this.firebaseCreate.bind(this);
    }
    render() {
        return (
            <Fragment>
                <form>
                    <label htmlFor="nom">nom:</label> <input id="nom" type="text" name="nom" autoComplete="nom" value={this.state.nom} onChange={this.handleChangeNom} required></input>
                    <label htmlFor="mail">mail:</label> <input id="mail" type="text" name="username" autoComplete="username" value={this.state.mail} onChange={this.handleChangeMail} required></input>
                    <label htmlFor="password">password:</label> <input id="password " type="password" name="password" autoComplete="current-password" value={this.state.password} onChange={this.handleChangePassword} required></input>
                    <button className="pink_button" type="submit" onClick={this.firebaseCreate}>Login</button>
                </form>
                <p>{this.state.error}</p>
            </Fragment>
        );
    }
    firebaseCreate(event) {
        let that = this
        event.preventDefault();
        firebase.auth().createUserWithEmailAndPassword(this.state.mail, this.state.password)
            .then(() => {
                var user = firebase.auth().currentUser
                user.updateProfile({
                    displayName: that.state.nom
                })
            })
            .catch(function (error) {
                // Handle Errors here.
                that.setState({ error: error.message })
                console.log(error.code, error.message)
                // ...
            });
    }
    handleChangeNom(event) {
        this.setState({ nom: event.target.value });
    }
    handleChangeMail(event) {
        this.setState({ mail: event.target.value });
    }
    handleChangePassword(event) {
        this.setState({ password: event.target.value });
    }
}


export default SignUp;