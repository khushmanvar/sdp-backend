const { db } = require("../util/admin");
const { firebase } = require("../util/fire");

exports.signin = (req, res) => {
    firebase
    .auth()
    .signInWithEmailAndPassword(req.body.email, req.body.password)
  .then((userCredential) => {
    db.collection("Users").doc(userCredential.user.uid).get().then((user) => {
        res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
        return res.status(200).json({"email": user.data().email, "name": user.data().name, "phoneNo": user.data().phoneNo});
    });
  })
  .catch((error) => {
    return res.status(403).json({general: error.message});
  });  
};