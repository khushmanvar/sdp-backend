const { firebase } = require("../util/fire");

exports.login = (req, res) => {
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
  