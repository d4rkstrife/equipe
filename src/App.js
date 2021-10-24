import React, { Fragment } from 'react';
import './App.css';
import ListeGare from './ListeGare';
import firebase from 'firebase';
import LogIn from './LogIn';
import Nav from './Nav';
import Form from './Form';
import { BrowserRouter, Route } from "react-router-dom";
import FormList from './FormList';
import Account from './Account';
import UsersAccount from './UsersAccount';
import './Nav.css';

class App extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            connectedUser: false,
            pageReady: false,
            isAdmin: false
        }
        this.logOut = this.logOut.bind(this)
    }
    render() {

        if (this.state.pageReady && this.state.connectedUser) {
            return (
                <Fragment>
                    <Nav />
                    <BrowserRouter>
                        <Route exact path="/" component={ListeGare} />
                        <Route path="/formList" component={() => <FormList isAdmin={this.state.isAdmin} />} />
                        <Route path="/form" component={Form} />
                        <Route path="/account" component={Account} />
                        <Route path="/usersAccount" component={UsersAccount} />


                    </BrowserRouter >
                </Fragment>

            );
        } else if (this.state.pageReady && !this.state.connectedUser) {
            return (
                <div className="App">
                    <Nav />
                    <LogIn />
                </div>
            )
        } else {
            return (
                <div className="App">
                    <Nav />
                    <p>Chargement...</p>
                </div>
            )
        }
    }
    componentDidMount() {
        let that = this
        firebase.auth().onAuthStateChanged(function (user) {
            that.setState({ connectedUser: user });
            let userDb = firebase.firestore();
            if (user) {
                userDb.collection('adminUsers').doc(user.email).get()
                    .then(function (doc) {
                        if (doc.exists && doc.data().isAdmin === true) {
                            that.setState({ isAdmin: true })
                        }
                    }).catch(function (error) {
                        console.log("Error getting document:", error);
                    });
            }
        })


        setTimeout(() => { this.setState({ pageReady: true }) }, 1000);
    }
    logOut() {
        let that = this
        firebase.auth().signOut().then(function () {
            // Sign-out successful.
            that.setState({ connectedUser: null, isAdmin: false })
        }).catch(function (error) {
            // An error happened.
        });
    }
}

export default App;
