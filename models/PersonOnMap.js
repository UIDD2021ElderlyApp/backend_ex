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

module.exports.getMultiPersonOnMap = function (time, callback) {
    console.log("------->get'Multi'PersonOnMap");
    PersonOnMap.find({ last_update_time: { $gt: time - 6000000} })//100分鐘內上線
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

