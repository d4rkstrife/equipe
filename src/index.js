import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import * as firebase from "firebase";

// On retrouve notre variable config 
const config = {
  apiKey: "AIzaSyABuhvxIkazZbmLr4BKSnrpULERVyiiDcg",
  authDomain: "gare-30379.firebaseapp.com",
  databaseURL: "https://gare-30379.firebaseio.com",
  projectId: "gare-30379",
  storageBucket: "gare-30379.appspot.com",
  messagingSenderId: "281929472736",
  appId: "1:281929472736:web:8b86e49dcae5e710af0e85",
  measurementId: "G-KJG2R20BE8"
};

firebase.initializeApp(config);
//...

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
