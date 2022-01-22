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

exports.conductSignup = (req, res) => {
  const user = {
    email: req.body.email,
    password: req.body.password,
  };

  firebase
    .auth()
    .createUserWithEmailAndPassword(user.email, user.password)
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
  let cid = req.params.cid;
  db.doc(`/Conductors/${cid}`).get()
    .then((doc) => {
      return res.status(200).json({ "Name": doc.data().name, "Email": doc.data().email, "Mobile Number": doc.data().mobile })
    })
    .catch((err) => {
      console.error(err);
      return res.status(500).json({ error: err.code });
    });
}

exports.getBusDetails = (req, res) => {
  let cid = req.params.cid;
  db.doc(`/Conductors/${cid}`).get()
    .then((doc) => {
      return res.status(200).json({ buses: doc.data().Buses });
    })
    .catch((err) => {
      console.error(err);
      return res.status(500).json({ error: err.code });
    })
}