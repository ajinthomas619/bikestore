import React, { useContext, useEffect } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import Login from './pages/Login';
import Home from './pages/Home';
import Signup from './pages/Signup';
import './App.css';
import { AuthContext, FirebaseContext } from './store/Context';





function App() {
  const { user, setUser } = useContext(AuthContext);
  const { auth, firebase } = useContext(FirebaseContext);

  // useEffect(() => {
  //   if(auth){
  //   firebase.auth().onAuthStateChanged((user) => {
  //     setUser(user);
  //   });
  // }
  // },[auth,setUser]);

  return (
    <div>
    
    <Router>
      {user ? (
        <Route exact path='/'>
          <Home />
        </Route>
      ) : (
        <Route path='/login'>
          <Login />
        </Route>
        
      )
}
        <Route exact path='/'>
          <Home />
        </Route>
      <Route path='/signup'>
      <Signup/>
      </Route>
      
    </Router>
    </div>
  );
}

export default App;

