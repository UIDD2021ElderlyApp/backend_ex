var DEF_DEBUG = true;

var express = require('express');
var fs = require('fs'); //load fs module
var router = express.Router();
var empty = require('is-empty');

var glob_user_obj;

var DailyMission = require('../models/DailyMission');

router.post('/',function (req, res) {
    var dailymission = req.body.dailymission; // input a json
    DailyMission.setDailyMission(glob_user_obj, dailymission, function (db_have_data) {
        if (db_have_data === -1) {
            if (DEF_DEBUG) {
                console.log(dailymission);
            }
            var newDailyMission = new DailyMission({
                wake: dailymission.wake,
                sleep: dailymission.sleep,
                picture: dailymission.picture,
                stroll: dailymission.stroll
            });
            DailyMission.createDailyMission(newDailyMission, function(err, newDailyMission){
                if(err) throw err;
                console.log(newDailyMission);
            });    
        } 
    });
    res.status(200).send();
});

router.post('/forexp',function (req, res){
    var reward = JSON.parse(fs.readFileSync('../exp/daily.json'));
    var choose = req.body.missiontype;  // 1->walk, 2->sleep, 3->picture, 4->stroll 
    if(choose==1)
    {
        res.send(reward.walk);
    }
    else if(choose==2)
    {
        res.send(reward.sleep);
    }
    else if(choose==3)
    {
        res.send(reward.picture);
    }
    else if(choose==4)
    {
        res.send(reward.stroll);
    }
});

router.get('/', ensureAuthenticated, function (req, res, next) {
    if (DEF_DEBUG) {
        console.log(glob_user_obj);
    }
    DailyMission.getDailyMissionByUserId(glob_user_obj.username, function (err, DailyMissionget) {
        if (err) {
            console.log(err);
            throw err;
        }
        if (!DailyMissionget) {
            console.log("DailyMissionget is empty!!!");
        }
        if (DEF_DEBUG) {
            console.log("-------------------------");
            console.log(DailyMissionget);
        }
        var content = {};
        content["wake"] = DailyMissionget[0].wake;
        content["sleep"] = DailyMissionget[0].sleep;
        content["picture"] = DailyMissionget[0].picture; 
        content["stroll"] = DailyMissionget[0].stroll; 
        if (DEF_DEBUG) {
            console.log(JSON.stringify(content));
        }
        res.status(200).send(JSON.stringify(content));
    });

});

function ensureAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        glob_user_obj = req.user;
        return next();
    }
    res.redirect('/users/login');
}

module.exports = router;