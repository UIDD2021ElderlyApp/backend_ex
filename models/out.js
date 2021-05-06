//using mongoose to connect mongodb
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/nodeauth', { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true });
var db = mongoose.connection;

//Post Schema
var outSchema = mongoose.Schema({
    path_distance: {
        type: Number
    }
});

//export out schema
var out = module.exports = mongoose.model('out', outSchema);

//passport
module.exports.getoutById = function (id, callback) {
    console.log("------->findoutById");
    out.findById(id, callback);
    console.log(callback);
}

module.exports.postout = function (outdoor, callback) {
    console.log("------->setout");
    var outdoor2 = JSON.parse(outdoor);
    console.log(outdoor2);
    var query = { Id: outdoor2.Id };
    console.log("------->setout2");
    out.findOne(query, function (err, outdoorget) {
        outdoorget.path_distance = outdoor2.path_distance + outdoorget.path_distance;
        outdoorget.save(callback);
    });
    console.log(callback);
}

module.exports.setout = function (outdoor, callback) {
    console.log("------->setout3");
    var outdoor2 = JSON.parse(outdoor);
    console.log(outdoor2);
    var query = { Id: outdoor2.Id };
    console.log("------->setout4");
    out.findOne(query, function (err, outdoorget) {
        outdoorget.path_distance = outdoor2.path_distance;
        outdoorget.save(callback);
    });
    console.log(callback);
}

module.exports.createout = function (newout, callback) {
    newout.save(callback);
}
