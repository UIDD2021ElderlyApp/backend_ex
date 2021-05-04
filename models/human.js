//using mongoose to connect mongodb
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/nodeauth', { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true });
var db = mongoose.connection;

//Human Schema
var HumanSchema = mongoose.Schema({
    Humanname: {
        type: String,
        index: true
    },
    name: {
        type: String
    },
    profileimage: {
        type: String
    },
    animal: {
        type: Map
    },
    rank: {
        type: Number
    },
    gps: {
        type: Array
    }
});

//export Human schema
var Human = module.exports = mongoose.model('Human', HumanSchema);

//passport
module.exports.getHumanById = function (id, callback) {
console.log("------->findById");
    Human.findById(id, callback);
    console.log(callback);
}

module.exports.getHumanByHumanname = function (Humanname, callback) {
    console.log("------->getHumanByHumanname");
    var query = { Humanname: Humanname };
    Human.findOne(query, callback);
    console.log(callback);
}

module.exports.getHumanByGPS = function (gps, distance ,callback) {
    console.log("------->getHumanByGPS");
    //var query = { gps: gps };
    Human.find({$where:function(){
        return square(this.gps[0] - gps[0]) + square(this.gps[1] - gps[1]) < squqre(distance);
    }}, 'Humanname', callback);
    console.log(callback);
}


//export createHuman function
module.exports.createHuman = function (newHuman, callback) {
    //newHuman.save(callback); //mongoose function to insert to DB
    newHuman.save(callback);
};