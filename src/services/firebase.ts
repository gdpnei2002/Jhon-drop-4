import firebase from "firebase/app"
import "firebase/database"

const firebaseConfig = {
  apiKey: "AIzaSyCIjdU7uanoPaNRlbEIc6QuMm_mR5E1uMA",
  authDomain: "jhon-luz.firebaseapp.com",
  projectId: "jhon-luz",
  storageBucket: "jhon-luz.appspot.com",
  messagingSenderId: "1021163533130",
  appId: "1:1021163533130:web:952fb5c83a8684095c47b3"
};

  if(!firebase.apps.length){
    firebase.initializeApp(firebaseConfig)
  }else{
    firebase.app()
  }

  const database= firebase.database()

  export {database,firebase}