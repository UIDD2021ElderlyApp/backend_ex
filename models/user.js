
/*Reading and Writing JSON Files with Node.js*/
const fsModule = require('fs');

let rawdata = fsModule.readFileSync('Variouskeys/mongodb.json');
let student = JSON.parse(rawdata);
console.log(student);
//------------------------------------------------------------------------------------------
//using mongoose to connect mongodb
var mongoose = require('mongoose');
var bcrypt = require('bcryptjs');
var stringmongooseconnect="mongodb://"+String(student.account)+":"+String(student.password)+"@140.116.132.223:27017/petdatabase_dev"
mongoose.connect(stringmongooseconnect, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true });
var db = mongoose.connection;

//User Schema
var UserSchema = mongoose.Schema({
    username: {
        type: String,
        index: true
    },
    password: {
        type: String
    },
    email: {
        type: String
    },
    name: {
        type: String
    },
    profileimage: {
        type: String
    }
});

//export User schema
var User = module.exports = mongoose.model('User', UserSchema);

//passport
module.exports.getUserById = function (id, callback) {
console.log("------->findById");
    User.findById(id, callback);
    console.log(callback);
}

module.exports.getUserByUsername = function (username, callback) {
    console.log("------->getUserByUsername");
    var query = { username: username };
    User.findOne(query, callback);
    console.log(callback);
}

module.exports.comparePassword = function (candidatePassword, hash, callback) {
    // Load hash from your password DB.
    bcrypt.compare(candidatePassword, hash, function (err, isMatch) {
        callback(null, isMatch);
    });
}

//export createUser function
module.exports.createUser = function (newUser, callback) {
    //newUser.save(callback); //mongoose function to insert to DB
    bcrypt.genSalt(10, function (err, salt) {
        bcrypt.hash(newUser.password, salt, function (err, hash) {
            // Store hash in your password DB.
            newUser.password = hash;
            newUser.save(callback);
        });
    });
};