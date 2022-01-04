const { db } = require("../util/admin");
const { firebase } = require("../util/fire");

exports.search = async (req, res) => {
    const source = req.query.source;
    const destination = req.query.dest;
    const date = req.query.date;
    const busesRef = db.collection('Buses');
    const busData = await busesRef.get();
    var buses = []
    var count = 0;

     try{
        busData.forEach(bus => {
            count++;
            var stations = bus.data().stations; 
            const s = stations.findIndex(s => s === source)
            const d = stations.findIndex(d => d === destination)
            if (s != -1 && d != -1 && s < d){
                const id = bus.id;
                const database = firebase.database();
                database.ref('/Buses/' + id + '/' + date + '/AvailableSeats/')
                /*.on( 'value', (snapshot) => {
                    return res.status(200).write({'Bus': id, 'Seats': snapshot.val()});
                })*/
                .get().then((snapshot) => {
                    buses.push({
                        'BusType': bus.data().BusType, 
                        'Destination': bus.data().Destination, 
                        'Origin': bus.data().Origin, 
                        'Seats': snapshot.val(), 
                        'Stations': bus.data().stations, 
                        'Distance': bus.data().Distance, 
                        'Timings': bus.data().Timings
                    });
                    if (count == busData.size){
                        return res.status(200).json(buses);
                     }
                });
            } else {
                if (count == busData.size){
                    return res.status(200).json(buses);
                 }
            }
          });
    } catch (error) {
        return res
            .status(500)
            .json({ 'error': error.message});
    }
};
