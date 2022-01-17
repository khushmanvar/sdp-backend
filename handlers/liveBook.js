const { firebase } = require("../util/fire");

exports.liveBook = (req, res) => {

    var destination = req.body.destination
    var distance = req.body.distance
    var fare = parseInt(distance) * 10
    var origin = req.body.origin
    var paymentMode = req.body.paymentMode
    var busId = req.body.busId

    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0');
    var yyyy = today.getFullYear();
    var currDate = dd + '-' + mm + '-' + yyyy;
    var currTime = currDate + "-" + today.getHours() + ":" + today.getMinutes()
    
    try{
        const database = firebase.database();
        database.ref('/Buses/' + busId + '/' + currDate + '/LiveBooking/lt102').set({
                'ApprovedStatus': 0,
                'Destination': destination,
                'Distance': distance,
                'Fare': fare,
                'Origin': origin,
                'PaymentMode': paymentMode,
                'TimeStamp': currTime
            }).then(() => {
                return res.status(200).json({'general': 'Booking Successful'});
            })
    }
    catch (error) {
        return res
            .status(500)
            .json({ 'error': error.message});
    }
};