//using mongoose to connect mongodb
var mongoose = require('mongoose');
//mongoose.connect('mongodb://localhost:27017/nodeauth', { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true });
//var db = mongoose.connection;

//Animal Schema
var AnimalSchema = mongoose.Schema({
    animalname: {
        type: String,
        index: true
    },
    hungryvalue: {
        type: Number
    },
    name: {
        type: String
    },
    profileimage: {
        type: String
    }
});

//export Animal schema
var Animal = module.exports = mongoose.model('Animal', AnimalSchema);

//passport
module.exports.getAnimalById = function (id, callback) {
console.log("------->findAnimalById");
    Animal.findById(id, callback);
    console.log(callback);
}

module.exports.getAnimalByAnimalname = function (animalname, callback) {
    console.log("------->getAnimalByAnimalname");
    var query = { animalname: animalname };
    Animal.findOne(query, callback);
    console.log(callback);
}

module.exports.setAnimalHungry = function (animalname, food, callback) {
    console.log("------->setAnimalHungry");
    var query = { animalname: animalname };
    Animal.updateOne(query, {hungry:hungry-food} ,callback);
    console.log(callback);
}