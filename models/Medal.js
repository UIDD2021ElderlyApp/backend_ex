var mongoose = require('mongoose');
const JsonFind = require("json-find");

const missionEXP = '../exp/accumulate';

var MedalSchema = mongoose.Schema({
    user_id: {
        type: Number
    },
    walk: {
        type: Number
    },
    post: {
        type: Number
    },
    message: {
        type: Number
    },
    level: {
        type: Number
    }
});

var Medal = module.exports = mongoose.model('Medal', MedalSchema);

module.exports.getMedalByUserId = function (userId_you_want_to_find, callback) {//it is a 16 int, from FB!
    console.log(userId_you_want_to_find);
    Medal.find(
        { "user_id": userId_you_want_to_find }//需要處裡多餘一個的使用者id
        , callback);
    console.log(callback);
}

module.exports.setMedalByUserId = function (userId_you_want_to_find, inputMedal, callback) {
    console.log("--------->setMedal");
    Medal.find({ "user_id": userId_you_want_to_find }, function(err, m_set){
        if (err) {
            console.log(err);
            callback(-1);
        }
        else
        {
            var newMedal = JSON.parse(inputMedal);
            m_set[0].walk = newMedal.walk;
            m_set[0].post = newMedal.post;
            m_set[0].message = newMedal.message;
            m_set[0].level = newMedal.level;
            m_set[0].save();
        }
    });
    callback(0);
}

module.exports.getMedalEXP = function (userId_you_want_to_find, reward, choose, callback){
    console.log("-------->getMedalEXP");
    Medal.find({"user_id": userId_you_want_to_find }, function(err, m_get){
        if(err)
        {
            console.log(err);
            callback(-1);
        }
        else
        {
            if(choose==1)
            {
                console.log("------->choose walk");
                var current = m_get.walk;
                callback(0, reward.walk[current].exp);
            }
            else if(choose==2)
            {
                console.log("------->choose sleep");
                var current = m_get.post;
                callback(0, reward.post[current].exp);
            }
            else if(choose==3)
            {
                console.log("------->choose picture");
                var current = m_get.message;
                callback(0, reward.message[current].exp);
            }
            else if(choose==4)
            {
                console.log("------->choose stroll");
                var current = m_get.level;
                callback(0, reward.level[current].exp);
            }
            else
            {
                callback(-1, 0);
            }
        }
    });
    
}