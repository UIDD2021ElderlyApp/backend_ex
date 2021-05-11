//using mongoose to connect mongodb
var mongoose = require('mongoose');
//mongoose.connect('mongodb://localhost:27017/nodeauth', { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true });
//var db = mongoose.connection;

//Post Schema
var MissionSchema = mongoose.Schema({
    token: {
        type: String
    },
    type: {
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
    Mission.findById(id, callback);
    console.log(callback);
}

module.exports.setMission = function (mission, callback) {
    console.log("------->setMission");
    var Mission2=JSON.parse(mission);
    console.log(Mission2);
    var query = { token: Mission2.token };
    console.log("------->setMission2");
    Mission.findOne(query, function(err, missionget){
        missionget.type = Mission2.type;
        missionget.goal = Mission2.goal;
        missionget.save(callback);
    });
    console.log(callback);
}

module.exports.createMission = function (newMission, callback) {
    newMission.save(callback);
}
