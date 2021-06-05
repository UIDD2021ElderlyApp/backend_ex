//using mongoose to connect mongodb
var mongoose = require('mongoose');
//mongoose.connect('mongodb://localhost:27017/nodeauth', { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true });
//var db = mongoose.connection;

//Post Schema
var RewardSchema = mongoose.Schema({

    exp: {
        type: Number
    },
    food: {
        type: Number
    },
    dessert: {
        type: Number
    }
});

//export Reward schema
var Reward = module.exports = mongoose.model('Reward', RewardSchema);

module.exports.getRewardByUserId = function (userId_you_want_to_find, callback) {//it is a 16 int, from FB!
    console.log("module.exports.getRewardByUserId(userId_you_want_to_find) = function (id, callback) {");
    console.log(userId_you_want_to_find);
    Reward.find(
        { "user_id": userId_you_want_to_find }//需要處裡多餘一個的使用者id
        , callback);
    console.log(callback);
}

module.exports.setReward = function (userId_you_want_to_find, exp, food, dessert, callback) {
    console.log("module.exports.getRewardByUserId(userId_you_want_to_find) = function (id, callback) {");
    console.log(userId_you_want_to_find);
    Reward.find(
        { "user_id": userId_you_want_to_find }//這裡有錯誤
        , function (err, rewardget) {
            if (err) {
                console.log(err);
                callback(-1);
            } else {
                rewardget[0].exp = exp;
                rewardget[0].food = food;
                rewardget[0].dessert = dessert;
                rewardget[0].save();
            }
        });
    callback(0);
}

module.exports.createReward = function (newReward, callback) {
    newReward.save(callback);
}
