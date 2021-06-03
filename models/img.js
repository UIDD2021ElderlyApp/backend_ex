//using mongoose to connect mongodb
var mongoose = require('mongoose');
//mongoose.connect('mongodb://localhost:27017/nodeauth', { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true });
//var db = mongoose.connection;

var stringsan = require("string-sanitizer");

//Img Schema
var ImgSchema = mongoose.Schema({
    user_name: {
        type: String
    },
    time: {
        type: Date
    },
    title: {
        type: String
    },
    content: {
        type: String
    }
});

//export Img schema
var Img = module.exports = mongoose.model('Img', ImgSchema);

//function

module.exports.getImgById = function (id, callback) {
    console.log("------->findImgById");
    Img.findById(stringsan.sanitize(id), callback);
    console.log(callback);
}

module.exports.getImgByImgtitle = function (title, callback) {
    console.log("------->getImgByImgtitle");
    var query = { title: title };
    Img.findOne(query, callback);
    console.log(callback);
}

module.exports.getMultiImgByUsername = function (user_name, time, number, callback) {
    console.log("------->get'Multi'ImgByUsername");
    Img.find({ user_name: { $eq: user_name }, time: { $lt: time } }).sort({ time: 'descending' }).limit(number).exec(callback);
    console.log(callback);
}

module.exports.createImg = function (newImg, callback) {
    newImg.save(callback);
}

/*
module.exports.deleteImgByImgId = function (Id, callback) {
    console.log("------->deleteImgByImgId");
    var query = { Id: Id };
    Img.deleteOne(query, callback);
    console.log(callback);
}
*/