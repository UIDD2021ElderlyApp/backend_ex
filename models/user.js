
/*Reading and Writing JSON Files with Node.js*/
const fsModule = require('fs');

let rawdata = fsModule.readFileSync('Variouskeys/mongodb.json');
let student = JSON.parse(rawdata);
console.log(student);
//------------------------------------------------------------------------------------------
//using mongoose to connect mongodb
var mongoose = require('mongoose');
var bcrypt = require('bcryptjs');
//var stringmongooseconnect = "mongodb://" + String(student.account) + ":" + String(student.password) + "@140.116.132.223:27017/petdatabase_dev"
var stringmongooseconnect = "mongodb+srv://" + String(student.account) + ":" + String(student.password) + "@cluster0.wko22.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"
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
    User.findById(id, callback);
    console.log(callback);
}

module.exports.getUserByUsername = function (username, callback) {
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

module.exports.findOrCreate = function (newUser, callback) {
    console.log(newUser);
    User.getUserByUsername(newUser.username, function (UsergetUserByUsernamenewUserusername) {
        console.log(UsergetUserByUsernamenewUserusername);
        if (!UsergetUserByUsernamenewUserusername) {
            User.createUser(newUser, function (UsercreateUsernewUser) {
                User.getUserByUsername(newUser.username,callback);
            })
        } else {
            User.getUserByUsername(newUser.username,callback);
        }
    })
};

module.exports.getanotheruser = function (username, callback) {
    var query = { username: { $eq: username }};
    User.findOne(query, 'profileimage', callback);
    console.log(callback);
}