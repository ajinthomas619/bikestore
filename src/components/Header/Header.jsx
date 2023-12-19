import React,{useContext} from 'react';
import { useHistory } from 'react-router-dom';
import './Header.css';

import Search from '../../assets/Search';
import Arrow from '../../assets/Arrow';

import {AuthContext,FirebaseContext} from '../../store/Context';
function Header() {
  const history = useHistory()
  const {user} =useContext(AuthContext)
  const {firebase} = useContext(FirebaseContext)
  return (
    <div className="headerParentDiv">
      <div className="headerChildDiv">
      
        <div className="placeSearch">
          <Search></Search>
          <input type="text" />
          <Arrow></Arrow>
        </div>
  
        <div className="language">
          <span> ENGLISH </span>
          <Arrow></Arrow>
        </div>
        <div className="loginPage">
          <span>{user?`${user.displayName}`:'Login'}</span>
          <hr />
        </div>
        {user &&  <span onClick={()=>{
          firebase.auth().signOut();
          history.push('/login');
        }}>Logout</span>}

        <div className="sellMenu">
         
          <div className="sellMenuContent">
            
            <span onClick={()=>{
              history.push('/create')
            }}>SELL</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Header;
