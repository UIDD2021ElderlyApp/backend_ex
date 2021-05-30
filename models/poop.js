//using mongoose to connect mongodb
var mongoose = require('mongoose');
//mongoose.connect('mongodb://localhost:27017/nodeauth', { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true });
//var db = mongoose.connection;

//Poop Schema
var PoopSchema = mongoose.Schema({
    time: {
        type: Date,
        index: true
    },
    user_name: {
        type: String
    },
    title: {
        type: String
    },
    text: {
        type: String
    },
    img: {
        type: String
    },
    comment: {
        type: Array
    }
});

//export Poop schema
var Poop = module.exports = mongoose.model('Poop', PoopSchema);

//function
/*
module.exports.getPoopById = function (id, callback) {
console.log("------->findPoopById");
    Poop.findById(id, callback);
    console.log(callback);
}

module.exports.getPoopByPooptitle = function (title, callback) {
    console.log("------->getPoopByPooptitle");
    var query = { title: title };
    Poop.findOne(query, callback);
    console.log(callback);
}
*/

module.exports.getPoopByPooptime = function (time, callback) {
    console.log("------->getPoopByPooptime");
    var query = { time: time };
    Poop.findOne(query, callback);
    console.log(callback);
}

module.exports.getMultiPoopByPooptime = function (time, number, callback) {
    console.log("------->get'Multi'PoopByPooptime");
    Poop.find({ time: { $lt: time } }, null , {sort:{ time: 'descending' }, limit: number }, callback);
    console.log(callback);
}

module.exports.createPoop = function (newPoop, callback) {
    newPoop.save(callback);
}

module.exports.setPoopComment = function (Id, user_name, time, text, callback) {
    console.log("------->setPoopComment");
    var query = { _id: Id };
    console.log("var comment = JSON.stringify({ user_name: user_name, time: time, text: text });");
    var comment = JSON.stringify({ user_name: user_name, time: time, text: text });
    Poop.findOne(query, function (err, postget) {
        postget.comment.push(comment);
        postget.save();
    });
    console.log("module.exports.setPoopComment ");
    callback();
}

/*
module.exports.deletePoopByPoopId = function (Id, callback) {
    console.log("------->deletePoopByPoopId");
    var query = { Id: Id };
    Poop.deleteOne(query, callback);
    console.log(callback);
}
*/