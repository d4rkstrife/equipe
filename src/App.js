import React, { Fragment } from 'react';
//import './App.css';
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
            <Fragment>
              <div className="app-container app-theme-white body-tabs-shadow fixed-sidebar fixed-header">
                <div className="app-header header-shadow">
                  <div className="app-header__logo">
                    <div className="logo-src"></div>
                    <div className="header__pane ml-auto">
                      <div>
                        <button type="button" className="hamburger close-sidebar-btn hamburger--elastic" data-class="closed-sidebar">
                          <span className="hamburger-box">
                            <span className="hamburger-inner"></span>
                          </span>
                        </button>
                      </div>
                    </div>
                  </div>
                  <div className="app-header__mobile-menu">
                    <div>
                      <button type="button" className="hamburger hamburger--elastic mobile-toggle-nav">
                        <span className="hamburger-box">
                          <span className="hamburger-inner"></span>
                        </span>
                      </button>
                    </div>
                  </div>
                  <div className="app-header__menu">

                  </div>    <div className="app-header__content">



                  </div>
                </div>

                <div className="app-main">
                  <div className="app-sidebar sidebar-shadow">
                    <div className="app-header__logo">
                      <div className="logo-src"></div>
                      <div className="header__pane ml-auto">
                        <div>
                          <button type="button" className="hamburger close-sidebar-btn hamburger--elastic" data-class="closed-sidebar">
                            <span className="hamburger-box">
                              <span className="hamburger-inner"></span>
                            </span>
                          </button>
                        </div>
                      </div>
                    </div>
                    <div className="app-header__mobile-menu">
                      <div>
                        <button type="button" className="hamburger hamburger--elastic mobile-toggle-nav">
                          <span className="hamburger-box">
                            <span className="hamburger-inner"></span>
                          </span>
                        </button>
                      </div>
                    </div>
                    <div className="app-header__menu">
                      <span>
                        <button type="button" className="btn-icon btn-icon-only btn btn-primary btn-sm mobile-toggle-header-nav">
                          <span className="btn-icon-wrapper">
                            <i className="fa fa-ellipsis-v fa-w-6"></i>
                          </span>
                        </button>
                      </span>
                    </div>    <div className="scrollbar-sidebar">
                      <div className="app-sidebar__inner">
                        <ul className="vertical-nav-menu">
                          <li className="app-sidebar__heading">Dashboard</li>
                          <li>
                            <Link to="/">Liste des Gares</Link>

                          </li>
                          <li>
                            <Link to="/form">Rapport</Link>
                          </li>
                          <li>
                            <Link to="/formList">Liste des rapports</Link>
                          </li>
                          <li>
                            <button className="mb-2 mr-2 btn btn-danger" onClick={this.logOut}>Deconnexion
                            </button>
                          </li>

                        </ul>
                      </div>
                    </div>

                  </div>
                  <div className="app-main__outer">
                    <div className="app-main__inner main-route-place">
                      <Route exact path="/" component={ListeGare} />
                      <Route path="/formList" component={() => <FormList isAdmin={this.state.isAdmin} />} />
                      <Route path="/form" component={Form} />
                    </div>
                  </div>
                </div>
              </div>

            </Fragment>

            {/*    <div>
              <ul classNameName="navibar">
                <li classNameName="navibar_lien">
                  <Link to="/">Liste des Gares</Link>
                </li>
                <li classNameName="navibar_lien">
                  <Link to="/form"><img id="logo_maison" src={logoForm} alt="Formulaire" /></Link>
                </li>
                {this.state.isAdmin ? (
                  <li classNameName="navibar_lien">
                    <Link to="/formList"><img id="logo_maison" src={logoFormConsult} alt="Liste formulaires" /></Link>
                  </li>
                ) : ("")}
                <li classNameName="navibar_lien">
                  <button id="deco_button" onClick={this.logOut}><img id="logo_deco" src={logoDeco} alt="Deco" /></button>
                </li>

              </ul>

              <hr />
              <div classNameName="main-route-place">
                <Route exact path="/" component={ListeGare} />
                <Route path="/formList" component={() => <FormList isAdmin={this.state.isAdmin} />} />
                <Route path="/form" component={Form} />
              </div>
                </div> */}
          </BrowserRouter>
        </div >
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
