const { firebase } = require("../util/fire");
const { db } = require("../util/admin")

exports.conductLogin = (req, res) => {
    const user = {
      email: req.body.email,
      password: req.body.password,
    };

    firebase
      .auth()
      .signInWithEmailAndPassword(user.email, user.password)
      .then((data) => {
        return data.user.getIdToken();
      })
      .then((token) => {
        return res.json({ token });
      })
      .catch((err) => {
        console.error(err);
        return res
          .status(403)
          .json({ general: "Wrong credentials, please try again" });
      });
};

exports.getConductorDetails = (req, res) => {
  db.doc(`/Conductors/`)
    .get()
    .then((doc) => {
      if(doc.exists) {
        return doc.data();
      } else {
        return res.status(404).json({ error: "Conductor not found" });
      }
    })
    .catch((err) => {
      console.error(err);
      return res.status(500).json({ error: err.code });
    });
}