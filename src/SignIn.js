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
                    <div className="mb-12">
                        <label htmlFor="mail" className="form-label">Email</label>
                        <input type="email" className="form-control" id="exampleFormControlInput1" placeholder="mail@example.com" value={this.state.mail} onChange={this.handleChangeMail} required />
                    </div>
                    <div className="mb-12">
                        <label htmlFor="password" className="form-label">Mot de passe</label>
                        <input type="password" className="form-control" id="password" name="password" placeholder="Mot de Passe" value={this.state.password} onChange={this.handleChangePassword} required />
                    </div>
                    <button type="button" className="btn btn-success" type="submit" onClick={this.firebaseLogin}>Login</button>
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