//using mongoose to connect mongodb
var mongoose = require('mongoose');
//mongoose.connect('mongodb://localhost:27017/nodeauth', { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true });
//var db = mongoose.connection;

//Personal Schema
var PersonalSchema = mongoose.Schema({
    user_name: {//編號
        type: String,
    },
    name: {//人名
        type: String
    },
    animal: {
        type: Number
    },
    getup_time: {
        type: Date
    },
    sleep_time: {
        type: Date
    }

});

//export Personal schema
var Personal = module.exports = mongoose.model('Personal', PersonalSchema);

//function

module.exports.createPersonal = function (newPersonal, callback) {
    newPersonal.save(callback);
}

module.exports.setPersonalgetup_time = function (user_name, getup_time, callback) {
    console.log("------->setPersonal");
    var query = { user_name: { $eq: user_name } };
    Personal.findOne(query, function(err, Personget){
        Personget.getup_time = getup_time;
        Personget.save()
    })
    callback()
}
module.exports.setPersonalsleep_time = function (user_name, sleep_time, callback) {
    console.log("------->setPersonalsleep_time");
    var query = { user_name: { $eq: user_name } };
    Personal.findOne(query, function(err, Personget){
        Personget.sleep_time = sleep_time;
        Personget.save()
    })
    callback()
}

module.exports.getPersonal = function (user_name, callback) {
    console.log("------->getPersonal");
    var query = { user_name: { $eq: user_name } };
    Personal.findOne(query, callback)
}