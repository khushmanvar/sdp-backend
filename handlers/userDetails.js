const { db } = require("../util/admin");

exports.userDetails = (req, res) => {
    try{
        const uid = req.query.uid;
        db.collection("Users").where("id", "==", uid).get()
        .then((snapshot) => {
            snapshot.forEach((user) => {
                return res.status(200).json({"Name": user.data().name, "Email": user.data().email, "PhoneNo": user.data().phoneNo});
            });
        });
    }catch(error){
        return res
            .status(500)
            .json({ 'error': error.message});
    }
}