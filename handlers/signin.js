const { json } = require("express");
const { db } = require("../util/admin");
const { firebase } = require("../util/fire");

exports.signin = (req, res) => {
    firebase
    .auth()
    .signInWithEmailAndPassword(req.body.email, req.body.password)
    .then((user) => {
      db.collection("Users").doc(user.user.uid).get().then((userDetails) => {
        console.log(userDetails);
      return res.json({email: userDetails.data().email,
                       name: userDetails.data().name,
                       phoneNoVerified: userDetails.data().phoneNoVerified,
                       emailVerified: userDetails.data().emailVerified,
                       phoneNo: userDetails.data().phoneNo,
                       photoUrl: userDetails.data().photoUrl,
                       id: userDetails.data().id

      });
      })
    })
    /*.then(() => {
      const user = firebase.auth().currentUser;
      console.log(user)
      user.sendEmailVerification().then(function() {
        console.log("Verification link sent to your email. Kinldy check to verify your account")
    })
    .then(() => {
      firebase.auth().onUserChanged(response => {
        if (response.emailVerified)
          return json({general: "Login Successful"});
      })
    })
    })*/
  .catch((error) => {
    return res.status(403).json({general: error.message});
  });  
};