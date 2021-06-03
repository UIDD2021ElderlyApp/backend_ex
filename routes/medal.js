const missionEXP = '../exp/accumulate.json';

var DEF_DEBUG = true;

var express = require('express');
var fs = require('fs'); //load fs module
var router = express.Router();

var glob_user_obj;

var Medal = require('../models/Medal');

router.post('/set', ensureAuthenticated, function(req, res){
    var inputMedal = req.body.medal;
    Medal.setMedalByUserId(glob_user_obj, inputMedal, function(db_have_data){
        if (db_have_data === -1) {
            if (DEF_DEBUG) {
                console.log(dailymission);
            }
            var newMedal = new Medal({
                walk: inputMedal.walk,
                post: inputMedal.post,
                message: inputMedal.message,
                level: inputMedal.level
            });
            DailyMission.createDailyMission(newMedal, function(err, newMedal){
                if(err) throw err;
                console.log(newMedal);
            });    
        }
    });
    res.status(200).send();
})

router.post('/forexp', ensureAuthenticated, function(req, res){
    var reward = JSON.parse(fs.readFileSync(missionEXP));
    var choose = req.body.missiontype;  // 1->walk, 2->post, 3->message, 4->level
    Medal.getMedalEXP(glob_user_obj, reward, choose, function(err, exp){
        if(err){
            console.log("ERROR!!! Check your input");
        }
        else
        {
            res.send(exp);
        }
    }) 
})

function ensureAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        glob_user_obj = req.user;
        return next();
    }
    res.redirect('/users/login');
}

module.exports = router;