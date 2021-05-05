//using mongoose to connect mongodb
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/nodeauth', { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true });
var db = mongoose.connection;

//Post Schema
var outSchema = mongoose.Schema({
    token: {
        type: String
    },
    path_length: {
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
    var outdoor2=JSON.parse(outdoor);
    console.log(outdoor2);
    var query = { token: outdoor2.token };
    console.log("------->setout2");
    out.findOne(query, function(err, outdoorget){
        outdoorget.path_length = outdoor2.path_length+outdoorget.path_length;
        outdoorget.save(callback);
    });
    console.log(callback);
}

module.exports.setout = function (outdoor, callback) {
    console.log("------->setout3");
    var outdoor2=JSON.parse(outdoor);
    console.log(outdoor2);
    var query = { token: outdoor2.token };
    console.log("------->setout4");
    out.findOne(query, function(err, outdoorget){
        outdoorget.path_length = outdoor2.path_length;
        outdoorget.save(callback);
    });
    console.log(callback);
}

module.exports.createout = function (newout, callback) {
    newout.save(callback);
}
