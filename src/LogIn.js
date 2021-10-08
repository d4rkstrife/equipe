import React, { Component } from 'react';
import LogInElt from './LogInElt'

class LogIn extends Component {
    constructor(props) {
        super(props)
        this.state = {
            typeOf: "SignIn",
            signIn: "active",
            signUp: "inactive"
        }
        this.changeStateIn = this.changeStateIn.bind(this);
        this.changeStateUp = this.changeStateUp.bind(this);
    }

    render() {
        return (
            <div className="login">
                <ul className="login_choice">
                    <li className={this.state.signIn}><a onClick={this.changeStateIn} href='#'>Se connecter</a></li>
                    <li className={this.state.signUp}><a onClick={this.changeStateUp} href='#'>Créer un compte</a></li>
                </ul>
                <LogInElt typeOf={this.state.typeOf} />
            </div>

        )

    }
    changeStateIn() {
        this.setState({ typeOf: "SignIn", signIn: "active", signUp: "inactive" })
    }
    changeStateUp() {
        this.setState({ typeOf: "SignUp", signIn: "inactive", signUp: "active" })
    }
}

export default LogIn;
