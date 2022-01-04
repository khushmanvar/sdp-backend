const { db } = require("../util/admin");
const { firebase } = require("../util/fire");

exports.signup = (req, res) => {
    firebase
    .auth()
    .createUserWithEmailAndPassword(req.body.email, req.body.password)
  .then((userCredential) => {
    db.collection("Users").doc(userCredential.user.uid).set({
      id: userCredential.user.uid, 
      name: userCredential.user.displayName, 
      photoUrl: userCredential.user.photoURL, 
      email: userCredential.user.email, 
      phoneNo: userCredential.user.phoneNumber,
      emailVerified: false,
      phoneNoVerified: false
    }).then(() => {
        return res.status(200).json({general: "Signup Success"});
    });
  })
  .catch((error) => {
    console.log(error.message);
    return res.status(403).json({general: error.message});
  });  
};