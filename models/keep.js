//using mongoose to connect mongodb
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/nodeauth', { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true });
var db = mongoose.connection;

//Keep Schema
var KeepSchema = mongoose.Schema({
    time: {
        type: Date,
        index: true
    },
    user_id: {
        type: String
    },
    title: {
        type: String
    },
    text: {
        type: String
    }
});

//export Keep schema
var Keep = module.exports = mongoose.model('Keep', KeepSchema);

//function
/*
module.exports.getKeepById = function (id, callback) {
console.log("------->findKeepById");
    Keep.findById(id, callback);
    console.log(callback);
}

module.exports.getKeepByKeeptitle = function (title, callback) {
    console.log("------->getKeepByKeeptitle");
    var query = { title: title };
    Keep.findOne(query, callback);
    console.log(callback);
}
*/

module.exports.getKeepByKeeptime = function (time, callback) {
    console.log("------->getKeepByKeeptime");
    var query = { time: time };
    Keep.findOne(query, callback);
    console.log(callback);
}

module.exports.createKeep = function (newKeep, callback) {
    newKeep.save(callback);
}

module.exports.deleteKeepByKeepId = function (id, callback) {
    console.log("------->deleteKeepByKeepId");
    var query = { _id: id };
    Keep.deleteOne(query, callback);
    console.log(callback);
}