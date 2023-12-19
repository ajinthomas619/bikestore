import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import 'firebase/compat/storage';


const firebaseConfig = {
  apiKey: "AIzaSyBN9ZS1F7kSaa-A8Wm8vOlvoi59-gEEhd4",
  authDomain: "bikestore-40d56.firebaseapp.com",
  projectId: "bikestore-40d56",
  storageBucket: "bikestore-40d56.appspot.com",
  messagingSenderId: "735344912491",
  appId: "1:735344912491:web:5724d25383fd1ccd75a92e",
  measurementId: "G-ZTYKEJWVMP"
};

export default firebase.initializeApp(firebaseConfig);