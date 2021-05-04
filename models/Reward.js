//using mongoose to connect mongodb
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/nodeauth', { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true });
var db = mongoose.connection;

//Post Schema
var RewardSchema = mongoose.Schema({
    token: {
        type: String
    },
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

//passport
module.exports.getRewardById = function (id, callback) {
    console.log("------->findRewardById");
    Reward.findById(id, callback);
    console.log(callback);
}

module.exports.setReward = function (reward, callback) {
    console.log("------->setReward");
    var reward2=JSON.parse(reward);
    console.log(reward2);
    var query = { token: reward2.token };
    console.log("------->setReward2");
    Reward.findOne(query, function(err, rewardget){
        rewardget.exp = reward2.exp;
        rewardget.food = reward2.food;
        rewardget.dessert = reward2.dessert;
        rewardget.save(callback);
    });
    console.log(callback);
}

module.exports.createReward = function (newReward, callback) {
    newReward.save(callback);
}
