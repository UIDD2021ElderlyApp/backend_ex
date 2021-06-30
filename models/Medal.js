var mongoose = require('mongoose');
const fs = require("fs");

const medalEXP = 'exp/accumulate.json';
const dailyEXP = 'exp/daily.json';

var MedalSchema = mongoose.Schema({
    user_id: {
        type: String
    },
    exp: {
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
    },
    walk: {
        progress: {
            type: Number
        },
        finished: {
            type: Boolean
        },
        goal: {
            type: Number
        }
    },
    post: {
        progress: {
            type: Number
        },
        finished: {
            type: Boolean
        },
        goal: {
            type: Number
        }
    },
    message: {
        progress: {
            type: Number
        },
        finished: {
            type: Boolean
        },
        goal: {
            type: Number
        }
    },
    level: {
        progress: {
            type: Number
        },
        finished: {
            type: Boolean
        },
        goal: {
            type: Number
        }
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
        if (m_set.length === 0) {
            console.log("------> create a new medal");
            callback(-1);
        }
        else
        {
            var levelChange = 0;
            var newMedal = JSON.parse(inputMedal);
            var dailyReward = JSON.parse(fs.readFileSync(dailyEXP));
            var medalReward = JSON.parse(fs.readFileSync(medalEXP));
            if(newMedal.type === 1) // daily__wake
            {
                console.log("-------> choose daily wake")
                if(!m_set[0].wake && newMedal.goal === 1)
                {
                    m_set[0].wake = true;
                    m_set[0].exp += dailyReward.wake;
                    if(m_set[0].exp >= 100)
                    {
                        m_set[0].exp -= 100;
                        levelChange = 1;
                    }
                }
                else if(m_set[0].wake && newMedal.goal === 0)
                {
                    m_set[0].wake = false;
                }
            }
            else if(newMedal.type === 2)
            {
                console.log("-------> choose daily sleep")
                if(!m_set[0].sleep && newMedal.goal === 1)
                {
                    m_set[0].sleep = true;
                    m_set[0].exp += dailyReward.sleep;
                    if(m_set[0].exp >= 100)
                    {
                        m_set[0].exp -= 100;
                        levelChange = 1;
                    }
                }
                else if(m_set[0].sleep && newMedal.goal === 0)
                {
                    m_set[0].sleep = false;
                }
            }
            else if(newMedal.type === 3)
            {
                console.log("-------> choose daily picture")
                if(!m_set[0].picture && newMedal.goal === 1)
                {
                    m_set[0].picture = true;
                    m_set[0].exp += dailyReward.picture;
                    if(m_set[0].exp >= 100)
                    {
                        m_set[0].exp -= 100;
                        levelChange = 1;
                    }
                }
                else if(m_set[0].picture && newMedal.goal === 0)
                {
                    m_set[0].picture = false;
                }
            }
            else if(newMedal.type === 4)
            {
                console.log("-------> choose daily stroll")
                if(!m_set[0].stroll && newMedal.goal === 1)
                {
                    m_set[0].stroll = true;
                    m_set[0].exp += dailyReward.stroll;
                    if(m_set[0].exp >= 100)
                    {
                        m_set[0].exp -= 100;
                        levelChange = 1;
                    }
                }
                else if(m_set[0].stroll && newMedal.goal === 0)
                {
                    m_set[0].stroll = false;
                }
            }
            else if(newMedal.type === 5)
            {
                console.log("-------> choose medal walk");
                if(!m_set[0].walk.finished)
                {
                    m_set[0].walk.goal += newMedal.goal;
                    if(m_set[0].walk.goal >= medalReward.walk[m_set[0].walk.progress].goal)
                    {
                        if(m_set[0].walk.progress === 12)
                        {
                            m_set[0].walk.finished = true;
                        }
                        m_set[0].walk.progress++;
                        m_set[0].exp += medalReward.walk[m_set[0].walk.progress].exp;
                        if(m_set[0].exp >= 100)
                        {
                            m_set[0].exp -= 100;
                            levelChange = 1;
                        }
                    }
                }
            }
            else if(newMedal.type === 6)
            {
                console.log("-------> choose medal post");
                if(!m_set[0].post.finished)
                {
                    m_set[0].post.goal += newMedal.goal;
                    if(m_set[0].post.goal >= medalReward.post[m_set[0].post.progress].goal)
                    {
                        if(m_set[0].post.progress === 8)
                        {
                            m_set[0].post.finished = true;
                        }
                        m_set[0].post.progress++;
                        m_set[0].exp += medalReward.post[m_set[0].post.progress].exp;
                        if(m_set[0].exp >= 100)
                        {
                            m_set[0].exp -= 100;
                            levelChange = 1;
                        }
                    }
                }
            }
            else if(newMedal.type === 7)
            {
                console.log("-------> choose medal message");
                if(!m_set[0].message.finished)
                {
                    m_set[0].message.goal += newMedal.goal;
                    if(m_set[0].message.goal >= medalReward.message[m_set[0].message.progress].goal)
                    {
                        if(m_set[0].message.progress === 8)
                        {
                            m_set[0].message.finished = true;
                        }
                        m_set[0].message.progress++;
                        m_set[0].exp += medalReward.message[m_set[0].message.progress].exp;
                        if(m_set[0].exp >= 100)
                        {
                            m_set[0].exp -= 100;
                            levelChange = 1;
                        }
                    }
                }
            }
            else if(newMedal.type === 8)
            {
                console.log("-------> choose medal level");
                if(!m_set[0].level.finished)
                {
                    m_set[0].level.goal += newMedal.goal;
                    if(m_set[0].level.goal >= medalReward.level[m_set[0].level.progress].goal)
                    {
                        if(m_set[0].level.progress === 8)
                        {
                            m_set[0].level.finished = true;
                        }
                        m_set[0].level.progress++;
                        m_set[0].exp += medalReward.level[m_set[0].level.progress].exp;
                        if(m_set[0].exp >= 100)
                        {
                            m_set[0].exp -= 100;
                            levelChange = 1;
                        }
                    }
                }
            }
            else
            {
                console.log("-------> ERROR!!! wrong input");
            }
            m_set[0].save();
            callback(levelChange);
        }
    });
}

module.exports.getDaily = function (userId_you_want_to_find, callback) {
    Medal.find({ "user_id": userId_you_want_to_find }, function(err, m_set){
        if (err||m_set.length === 0) {
            console.log(err);
            var wrongDailyMission = {
                "wake": false,
                "sleep": false,
                "picture": false,
                "stroll": false
            };
            callback(JSON.stringify(wrongDailyMission));
        }
        else 
        {
            var dailyMission = {
                "wake": m_set[0].wake,
                "sleep": m_set[0].sleep,
                "picture": m_set[0].picture,
                "stroll": m_set[0].stroll
            };
            callback(JSON.stringify(dailyMission));
        }
    })
}

module.exports.getEXP = function (userId_you_want_to_find, callback) {
    Medal.find({ "user_id": userId_you_want_to_find }, function(err, m_set){
        if(err||m_set.length === 0) {
            console.log(err);
            callback(-1);
        }
        else
        {
            console.log("------> get player's exp : " + m_set[0].exp);
            callback(m_set[0].exp);
        }
    })
}

module.exports.getWalk = function (userId_you_want_to_find, callback) {
    Medal.find({ "user_id": userId_you_want_to_find }, function(err, m_set){
        if(err||m_set.length === 0) {
            console.log(err);
            var wrongWalk = {
                "progress": 0,
                "goal": 0
            }
            callback(JSON.stringify(wrongWalk));
        }
        else
        {
            var medalBool = [false, false, false, false, false, false, false, false, false, false, false, false];
            console.log("------> get player's walk");
            var currentprogress = m_set[0].walk.progress;
            if(currentprogress > 12) currentprogress = 12;
            for(var i = 0; i<currentprogress;i++)
            {
                medalBool[i] = true;
            }
            var walkMission = {
                "progress": medalBool,
                "goal": m_set[0].walk.goal
            }
            callback(JSON.stringify(walkMission));
        }
    })
}

module.exports.getPost = function (userId_you_want_to_find, callback) {
    Medal.find({ "user_id": userId_you_want_to_find }, function(err, m_set){
        if(err||m_set.length === 0) {
            console.log(err);
            var wrongPost = {
                "progress": 0,
                "goal": 0
            }
            callback(JSON.stringify(wrongPost));
        }
        else
        {
            var medalBool = [false, false, false, false, false, false, false, false];
            console.log("------> get player's post");
            var currentprogress = m_set[0].post.progress;
            if(currentprogress > 8) currentprogress = 8;
            for(var i = 0; i<currentprogress;i++)
            {
                medalBool[i] = true;
            }
            var postMission = {
                "progress": medalBool,
                "goal": m_set[0].post.goal
            }
            callback(JSON.stringify(postMission));
        }
    })
}

module.exports.getMessage = function (userId_you_want_to_find, callback) {
    Medal.find({ "user_id": userId_you_want_to_find }, function(err, m_set){
        if(err||m_set.length === 0) {
            console.log(err);
            var wrongMessage = {
                "progress": 0,
                "goal": 0
            }
            callback(JSON.stringify(wrongMessage));
        }
        else
        {
            var medalBool = [false, false, false, false, false, false, false, false];
            console.log("------> get player's message");
            var currentprogress = m_set[0].message.progress;
            if(currentprogress > 8) currentprogress = 8;
            for(var i = 0; i<currentprogress;i++)
            {
                medalBool[i] = true;
            }
            var messageMission = {
                "progress": medalBool,
                "goal": m_set[0].message.goal
            }
            callback(JSON.stringify(messageMission));
        }
    })
}

module.exports.getLevel = function (userId_you_want_to_find, callback) {
    Medal.find({ "user_id": userId_you_want_to_find }, function(err, m_set){
        if(err||m_set.length === 0) {
            console.log(err);
            var wrongLevel = {
                "progress": 0,
                "goal": 0
            }
            callback(JSON.stringify(wrongLevel));
        }
        else
        {
            var medalBool = [false, false, false, false, false, false, false, false];
            console.log("------> get player's level");
            var currentprogress = m_set[0].level.progress;
            if(currentprogress > 8) currentprogress = 8;
            for(var i = 0; i<currentprogress;i++)
            {
                medalBool[i] = true;
            }
            var levelMission = {
                "progress": medalBool,
                "goal": m_set[0].level.goal
            }
            callback(JSON.stringify(levelMission));
        }
    })
}

module.exports.createMedal = function (newMedal, callback) {
    newMedal.save(callback);
}