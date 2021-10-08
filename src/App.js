import React from 'react';
import './App.css';
import ListeGare from './ListeGare';
import firebase from 'firebase';
import LogIn from './LogIn';
import Form from './Form'
import { BrowserRouter, Route, Link } from "react-router-dom";
import logoMaison from './image/home.svg';
import logoDeco from './image/log-out.svg';
import logoFormConsult from './image/file-text.svg';
import logoForm from './image/file.svg';
import FormList from './FormList';

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
        <div className="App">
          <h1>Equipe de ligne</h1>


          <BrowserRouter>
            <div>
              <ul className="navibar">
                <li className="navibar_lien">
                  <Link to="/"><img id="logo_maison" src={logoMaison} alt="Accueil" /></Link>
                </li>
                <li className="navibar_lien">
                  <Link to="/form"><img id="logo_maison" src={logoForm} alt="Formulaire" /></Link>
                </li>
                {this.state.isAdmin ? (
                  <li className="navibar_lien">
                    <Link to="/formList"><img id="logo_maison" src={logoFormConsult} alt="Liste formulaires" /></Link>
                  </li>
                ) : ("")}
                <li className="navibar_lien">
                  <button id="deco_button" onClick={this.logOut}><img id="logo_deco" src={logoDeco} alt="Deco" /></button>
                </li>

              </ul>

              <hr />
              <div className="main-route-place">
                <Route exact path="/" component={ListeGare} />
                <Route path="/formList" component={() => <FormList isAdmin={this.state.isAdmin} />} />
                <Route path="/form" component={Form} />
              </div>
            </div>
          </BrowserRouter>
        </div>
      );
    } else if (this.state.pageReady && !this.state.connectedUser) {
      return (
        <div className="App">
          <h1>Equipe de ligne</h1>
          <LogIn />
        </div>
      )
    } else {
      return (
        <div className="App">
          <h1>Equipe de ligne</h1>
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
