import React, { Component } from 'react';
import SignIn from './SignIn';
import SignUp from './SignUp'

class LogInElt extends Component {

    render() {
        if (this.props.typeOf === "SignIn") {
            return (
                <SignIn />
            )
        } else {
            return (
                <SignUp />
            );
        }

    }
}

export default LogInElt;