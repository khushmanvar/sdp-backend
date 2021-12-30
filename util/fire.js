const firebase = require('firebase');

var firebaseConfig = {
    apiKey: "AIzaSyAlFDrNo46qmM8yUtKlrMDmSW7anNdbEQQ",
    authDomain: "csi-website-cd583.firebaseapp.com",
    projectId: "csi-website-cd583",
    storageBucket: "csi-website-cd583.appspot.com",
    messagingSenderId: "219220345469",
    appId: "1:219220345469:web:42857fcd1627bd868e2714",
    measurementId: "G-6H1ZJEQM6J"
  };

firebase.initializeApp(firebaseConfig);

module.exports = { firebase };