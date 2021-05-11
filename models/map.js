//using mongoose to connect mongodb
var mongoose = require('mongoose');
//mongoose.connect('mongodb://localhost:27017/nodeauth', { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true });
//var db = mongoose.connection;

//Map Schema
var MapSchema = mongoose.Schema({
    MapTime: {
        type: String,
        index: true
    },
});

//export Map schema
var Map = module.exports = mongoose.model('Map', MapSchema);


