const { db } = require("../util/admin");
const { firebase } = require("../util/fire");

exports.signin = (req, res) => {
    firebase
    .auth()
    .signInWithEmailAndPassword(req.body.email, req.body.password)
    .then((data) => {
      return data.user.getIdToken();
    })
    .then((token) => {
      return res.json({ token });
    })
    .then((userCredential) => {
      db.collection("Users").doc(userCredential.user.uid).get().then((user) => {
        return res.status(200).json({"email": user.data().email, "name": user.data().name, "phoneNo": user.data().phoneNo});
    });
  })
  .catch((error) => {
    return res.status(403).json({general: error.message});
  });  
};