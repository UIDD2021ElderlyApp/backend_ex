var mongoose = require('mongoose');

var DailyMissionSchema = mongoose.Schema({
    user_id: {
        type: Number
    },
    wake: {
        type: Boolean
    },
    sleep: {
        type: Boolean
    },
    picture: {
        type: Boolean
    },
    stroll: {
        type: Boolean
    }
});

var DailyMission = module.exports = mongoose.model('DailyMission', DailyMissionSchema);

module.exports.getDailyMissionByUserId = function (userId_you_want_to_find, callback) {//it is a 16 int, from FB!
    console.log(userId_you_want_to_find);
    DailyMission.find(
        { "user_id": userId_you_want_to_find }//需要處裡多餘一個的使用者id
        , callback);
    console.log(callback);
}

module.exports.setDailyMission = function(userId_you_want_to_find, mission, callback)
{
    console.log("------->set wake daily mission");
    var newDailyMission = JSON.parse(mission);
    DailyMission.find({"user_id":userId_you_want_to_find}, function(err, m_set){
        if (err) {
            console.log(err);
            callback(-1);
        }
        else{
            m_set[0].wake = newDailyMission.wake;
            m_set[0].sleep = newDailyMission.sleep;
            m_set[0].picture = newDailyMission.picture;
            m_set[0].stroll = newDailyMission.stroll;
            m_set[0].save();
        }

    });
    callback(0);
}

module.exports.createDailyMission = function (newDailyMission, callback) {
    newDailyMission.save(callback);
}