import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';


import {FirebaseContext} from './store/Context'; 
import Context from './store/Context'/// Corrected import statement
import firebase from './firebase/config'; 
ReactDOM.render(
  <FirebaseContext.Provider value={{ firebase}}>
   <Context>


    <App />

   </Context>
  </FirebaseContext.Provider>,
  document.getElementById('root'))