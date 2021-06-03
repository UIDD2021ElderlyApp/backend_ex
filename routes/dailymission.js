var DEF_DEBUG = true;

const missionEXP = '../exp/daily.json';

var express = require('express');
var fs = require('fs'); //load fs module
var router = express.Router();
var empty = require('is-empty');

var glob_user_obj;

var DailyMission = require('../models/DailyMission');

router.post('/', ensureAuthenticated, function (req, res) {
    var inputdailymission = req.body.dailymission; // input a json
    DailyMission.setDailyMission(glob_user_obj, inputdailymission, function (db_have_data) {
        if (db_have_data === -1) {
            if (DEF_DEBUG) {
                console.log(inputdailymission);
            }
            var newDailyMission = new DailyMission({
                user_id: glob_user_obj,
                wake: inputdailymission.wake,
                sleep: inputdailymission.sleep,
                picture: inputdailymission.picture,
                stroll: inputdailymission.stroll
            });
            DailyMission.createDailyMission(newDailyMission, function(err, newDailyMission){
                if(err) throw err;
                console.log(newDailyMission);
            });    
        } 
    });
    res.status(200).send();
});

router.post('/forexp', ensureAuthenticated, function (req, res){
    var reward = JSON.parse(fs.readFileSync(missionEXP));
    var choose = req.body.missiontype;  // 1->wake, 2->sleep, 3->picture, 4->stroll 
    DailyMission.getDailyMissionEXP(reward, choose, function(err, exp){
        if(err){
            console.log("ERROR!!! Check your input");
        }
        else
        {
            res.send(exp);
        }
    });
});

router.get('/', ensureAuthenticated, function (req, res) {
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