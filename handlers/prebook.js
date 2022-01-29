const { db } = require("../util/admin");

exports.prebook = (req, res) => {
    let ticket = {
        name: req.body.name,
        bid: req.body.bid, 
        sno: req.body.sno,
        fare: req.body.fare
    };

    db.collection("Tickets").add(ticket)
        .then((doc) => {
            res.json({ "tid": doc.id });
        })
        .catch((err) => {
            res.status(500).json({ error: 'something went wrong' });
            console.error(err);
          });

}