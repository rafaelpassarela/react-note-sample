import firebase from 'firebase';

var config = {
    apiKey: "AIzaSyBb7PJxSL65G9KunL-Gz6e24WxS0Y8ayuU",
    authDomain: "notes-ac1ca.firebaseapp.com",
    databaseURL: "https://notes-ac1ca.firebaseio.com",
    projectId: "notes-ac1ca",
    storageBucket: "notes-ac1ca.appspot.com",
    messagingSenderId: "455440739758"
  };

  var fire = firebase.initializeApp(config);

  export default fire;