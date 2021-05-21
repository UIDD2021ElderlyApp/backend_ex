var mongoose = require('mongoose');

//Post Schema
var randomstringgenerate100Schema = mongoose.Schema({

    time: {
        type: Date
    },
    randomstringgenerate100: {
        type: String
    }
});

//export Reward schema
var loginpageloadtimeoutverification = module.exports = mongoose.model('loginpageloadtimeoutverification', randomstringgenerate100Schema);

module.exports.getloginpageloadtimeoutverification = function (loginpageloadtimeoutverification_you_want_to_find, callback) {
    console.log(loginpageloadtimeoutverification_you_want_to_find);
    loginpageloadtimeoutverification.find(
        { "randomstringgenerate100": loginpageloadtimeoutverification_you_want_to_find }
        , callback);
        console.log(callback);
}

module.exports.createloginpageloadtimeoutverification = function (randomstringgenerate100tomongodb, callback) {
    console.log("DB!!!module.exports.createloginpageloadtimeoutverification");
    randomstringgenerate100tomongodb.save(callback);
}
