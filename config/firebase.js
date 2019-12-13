const firebase = require('firebase/app')
require('firebase/firestore')

 var firebaseConfig = {
    apiKey: "AIzaSyAd1cGwNveL4WRq1Nc2EXgKIdq19B1pvW8",
    authDomain: "jankenpon-6a042.firebaseapp.com",
    databaseURL: "https://jankenpon-6a042.firebaseio.com",
    projectId: "jankenpon-6a042",
    storageBucket: "jankenpon-6a042.appspot.com",
    messagingSenderId: "29473154295",
    appId: "1:29473154295:web:fbabcbdf504cf13669dff2"
  };

firebase.initializeApp(firebaseConfig);
const db =  firebase.firestore()
module.exports = db
// module.exports = firebaseConfig