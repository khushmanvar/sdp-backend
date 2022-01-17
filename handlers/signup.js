const { db } = require("../util/admin");
const { firebase } = require("../util/fire");

exports.signup = (req, res) => {
  firebase
    .auth()
    .createUserWithEmailAndPassword(req.body.email, req.body.password)
    .then((userCredential) => {
      db.collection("Users").doc(userCredential.user.uid).set({
        id: userCredential.user.uid, 
        name: req.body.name, 
        photoUrl: userCredential.user.photoURL, 
        email: userCredential.user.email, 
        phoneNo: req.body.phoneNo,
        emailVerified: false,
        phoneNoVerified: false
      })
    })
    .then((data) => {
      return data.user.getIdToken();
    })
    .then((token) => {
      return res.json({ token });
    })
    .catch((error) => {
      console.log(error.message);
      return res.status(403).json({general: error.message});
    });  
};