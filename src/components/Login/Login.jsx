import React, { useState ,useContext,useEffect} from 'react';
import {FirebaseContext} from '../../store/Context'

import Logo from '../../bikenbiker-logo.png';
import './Login.css';
import {useHistory,Link} from 'react-router-dom'

import { auth,signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import Home from '../../pages/Home'



function Login() {
    const [value,setValue] = useState('')
    const [user,setUser] = useState('')
  const [email,setEmail] = useState('');
  const [password,setPassword] = useState('')
  const {firebase} = useContext(FirebaseContext)
  const history = useHistory();
  const handleLogin = (e)=>{
    e.preventDefault()
    firebase.auth().signInWithEmailAndPassword(email,password).then(()=>{
     history.push('/');
    }).catch((error)=>{
      alert(error.message)
    })
  }
 const handleClick =async () =>{
    try {
      const auth = firebase.auth();
      if (!auth) {
        console.error('Firebase auth object is not available');
        return;
      }
  
      const provider = new GoogleAuthProvider();
        const result = await signInWithPopup(auth,provider);
        setUser(result.user);
        history.push('/')
      } catch (error) {
        console.error('Google login error', error);
      }
 }
  useEffect(()=>{
    setValue(localStorage.getItem('email'))
  },[])


  return (
    <div>
      <div className="loginParentDiv">
        <img width="200px" height="200px" src={Logo}></img>
        <form onSubmit={handleLogin}>
          <label htmlFor="fname">Email</label>
          <br />
          <input
            className="input"
            type="email"
            value={email}
            onChange={(e)=>setEmail(e.target.value)}
            id="fname"
            name="email"
            defaultValue="John"
          />
          <br />
          <label htmlFor="lname">Password</label>
          <br />
          <input
            className="input"
            type="password"
            value={password}
            onChange={(e)=>setPassword(e.target.value)}
            id="lname"
            name="password"
            defaultValue="Doe"
          />
          <br />
          <br />
          <button>Login</button>
        </form>
        {value?<Home/>:
         <button onClick ={handleClick}>Signin With Google</button>
         }
        
         
        <Link to="/signup">Signup</Link>
      </div>
    </div>
  );
}

export default Login;
