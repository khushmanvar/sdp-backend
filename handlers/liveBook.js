const { db, admin } = require("../util/admin");
const { firebase } = require("../util/fire");

exports.liveBook = (req, res) => {

    var destination = req.body.destination
    var distance = req.body.distance
    var fare = parseInt(distance) * 10
    var origin = req.body.origin
    var paymentMode = req.body.paymentMode
    var busId = req.body.busId
    var uid = req.body.uid

    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0');
    var yyyy = today.getFullYear();
    var currDate = dd + '-' + mm + '-' + yyyy;
    var currTime = currDate + "-" + today.getHours() + ":" + today.getMinutes()
    
    try{
        const database = firebase.database();
        const ticketDb = database.ref('/Buses/' + busId + '/' + currDate + '/LiveBooking/')
        ticketDb.push({
                'ApprovedStatus': 0,
                'Destination': destination,
                'Distance': distance,
                'Fare': fare,
                'Origin': origin,
                'PaymentMode': paymentMode,
                'TimeStamp': currTime
            }).then((snapshot) => {
                var id = snapshot.getKey()
                database.ref('/Buses/' + busId + '/' + currDate + '/LiveBooking/' + id + '/').update({"id": id})
                db.collection("Users").doc(uid).update({
                    liveTickets: admin.firestore.FieldValue.arrayUnion(id)
                }).then(() => {
                    database.ref('/Buses/' + busId + '/12-01-2022' + '/Crowd').get().then((crowd) => {
                        crowd = parseInt(crowd.val()) + 1 
                        database.ref('/Buses/' + busId + '/12-01-2022' + '/').update({"Crowd": crowd}).then(() => {
                            return res.status(200).json({'general': 'Booking Successful'});
                        })
                    })
                  });        
            })
    }
    catch (error) {
        return res
            .status(500)
            .json({ 'error': error.message});
    }
};