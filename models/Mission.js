//using mongoose to connect mongodb
var mongoose = require('mongoose');
//mongoose.connect('mongodb://localhost:27017/nodeauth', { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true });
//var db = mongoose.connection;

var stringsan = require("string-sanitizer");

//Post Schema
var MissionSchema = mongoose.Schema({
    user_id: {
        type: Number
    },
    type: {  // 1:walk 2:food 3:disr 4:poop
        type: Number
    },
    goal: {
        type: Number
    }
});

//export Mission schema
var Mission = module.exports = mongoose.model('Mission', MissionSchema);

//passport
module.exports.getMissionById = function (id, callback) {
    console.log("------->findMissionById");
    Mission.findById(stringsan.sanitize(id), callback);
    console.log(callback);
}

module.exports.setMission = function (userId_you_want_to_find, mission, callback) {
    console.log("------->setMission");
    var Mission2=JSON.parse(mission);
    console.log(Mission2);
    console.log("------->setMission2");
    Mission.find({"user_id":{ $eq: userId_you_want_to_find }}, function(err, missionget){
        missionget.type = Mission2.type;
        missionget.goal = Mission2.goal;
        missionget.save(callback);
    });
    console.log(callback);
}

module.exports.setwalk = function (userId_you_want_to_find, dist, callback) {
    console.log("------->setWalkMission");
    console.log("dist : " + dist);
    Mission.find({"user_id":userId_you_want_to_find}, function(err, missionget){
        if (err) {
            console.log(err);
            callback(-1);
        } else {
            missionget[0].type = 1;
            missionget[0].goal = dist;
            missionget[0].save();
        }
    })
}

module.exports.getwalk = function (userId_you_want_to_find, callback) {
    console.log("------->getWalkMission");
    console.log("userId_you_want_to_find");
    Mission.find({"user_id":userId_you_want_to_find}, callback);
    console.log(callback);
}

module.exports.createMission = function (newMission, callback) {
    newMission.save(callback);
}
