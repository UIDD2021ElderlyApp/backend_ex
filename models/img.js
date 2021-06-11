//using mongoose to connect mongodb
var mongoose = require('mongoose');
//mongoose.connect('mongodb://localhost:27017/nodeauth', { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true });
//var db = mongoose.connection;

var stringsan = require("string-sanitizer");
var DEF_DEBUG = false;

//Img Schema
var ImgSchema = mongoose.Schema({
    user_name: {
        type: String
    },
    time: {
        type: String
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
    if(DEF_DEBUG)console.log("------->findImgById");
    Img.findById(stringsan.sanitize(id), callback);
    if(DEF_DEBUG)console.log(callback);
}

module.exports.getImgByImgtitle = function (title, callback) {
    if(DEF_DEBUG)console.log("------->getImgByImgtitle");
    var query = { title: { $eq: title }};
    Img.findOne(query, callback);
    if(DEF_DEBUG)console.log(callback);
}

module.exports.getMultiImgByUsername = function (user_name, callback) {
    if(DEF_DEBUG)console.log("------->get'Multi'ImgByUsername");
    console.log("module.exports.getMultiImgByUsername = function (user_name, callbac");
    Img.find({ user_name: { $eq: user_name }}).exec(callback);
    if(DEF_DEBUG)console.log(callback);
}

module.exports.createImg = function (newImg, callback) {
    newImg.save(callback);
}

/*
module.exports.deleteImgByImgId = function (Id, callback) {
    if(DEF_DEBUG)console.log("------->deleteImgByImgId");
    var query = { Id: Id };
    Img.deleteOne(query, callback);
    if(DEF_DEBUG)console.log(callback);
}
*/