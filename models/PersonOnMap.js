//using mongoose to connect mongodb
var mongoose = require('mongoose');
//mongoose.connect('mongodb://localhost:27017/nodeauth', { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true });
//var db = mongoose.connection;

//PersonOnMap Schema
var PersonOnMapSchema = mongoose.Schema({
    last_update_time: {
        type: Date,
        index: true
    },
    user_name: {//編號
        type: String
    },
    name: {//人名
        type: String
    },
    animal: {
        type: Number
    },
    position: {
        type: Map
    }
});

//export PersonOnMap schema
var PersonOnMap = module.exports = mongoose.model('PersonOnMap', PersonOnMapSchema);

//function

module.exports.getMultiPersonOnMapByPosition = function (time, position, distance, callback) {
    console.log("------->get'Multi'PersonOnMapByPosition");
    PersonOnMap.find({ last_update_time: { $lt: time - 5000 } })
        .$where(distance > getDistance(position['lat'], position['lng'], this.position['lat'], this.position['lng']))
        .sort({ last_update_time: 'descending' }).exec(callback);
    console.log(callback);
}

module.exports.createPersonOnMap = function (newPersonOnMap, callback) {
    newPersonOnMap.save(callback);
}

module.exports.setPersonOnMapPosition = function (time, user_name, position, callback) {
    console.log("------->setPersonOnMapPosition");
    var query = { user_name: { $eq: user_name } };
    PersonOnMap.findOne(query, function (err, Personget) {
        if (Personget) {
            Personget.last_update_time = time;
            Personget.position = position;
            Personget.save();
            callback(0);
        }
        else {
            callback(1);
        }
    });
    console.log("module.exports.setPersonOnMapPosition ");

}

function getDistance(lat1, lng1, lat2, lng2) {
    var dis = 0;
    var radLat1 = toRadians(lat1);
    var radLat2 = toRadians(lat2);
    var deltaLat = radLat1 - radLat2;
    var deltaLng = toRadians(lng1) - toRadians(lng2);
    var dis = 2 * Math.asin(Math.sqrt(Math.pow(Math.sin(deltaLat / 2), 2) + Math.cos(radLat1) * Math.cos(radLat2) * Math.pow(Math.sin(deltaLng / 2), 2)));
    return dis * 6378137;
}