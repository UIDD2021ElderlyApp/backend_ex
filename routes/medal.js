const missionEXP = '../exp/accumulate.json';

var DEF_DEBUG = true;

var express = require('express');
var fs = require('fs'); //load fs module
var router = express.Router();

var glob_user_obj;

var Medal = require('../models/Medal');

router.post('/', ensureAuthenticated, function(req, res){
    var inputMedal = JSON.parse(req.body.medal);
    Medal.setMedalByUserId(glob_user_obj.username, inputMedal, function(db_type){
        if (db_type === -1) {
            var newMedal = new Medal({
                user_id: glob_user_obj.username,
                exp: 0,
                wake: false,
                sleep: false,
                picture: false,
                stroll: false,
                walk: {
                    progress: 0,
                    finished: false,
                    goal: 0
                },
                post: {
                    progress: 0,
                    finished: false,
                    goal: 0
                },
                message: {
                    progress: 0,
                    finished: false,
                    goal: 0
                },
                level: {
                    progress: 0,
                    finished: false,
                    goal: 0
                }
            });
            Medal.createMedal(newMedal, function(err, newMedal){
                if(err) throw err;
                console.log(newMedal);
            });  
            Medal.setMedalByUserId(glob_user_obj.username, inputMedal, function(db_type_2){
                console.log("**********Reload to put data**********");
                if(db_type_2 === 1)
                {
                    var levelObject = {
                        type: 8,
                        goal: 1
                    }
                    Medal.setMedalByUserId(glob_user_obj.username, levelObject, function(db_type_3){
                        console.log("**********Reload to level up**********");
                    });
                }
            }); // reset the data  
        }
        if(db_type === 1)
        {
            var levelObject = {
                type: 8,
                goal: 1
            }
            Medal.setMedalByUserId(glob_user_obj.username, levelObject, function(db_type){
                console.log("**********Reload to level up**********");
            });
        }
    });
    res.status(200).send();
})

router.post('/getdaily', ensureAuthenticated, function(req, res){
    Medal.getDaily(glob_user_obj.username, function(dailyMissionComplete){
        res.status(200).send(dailyMissionComplete);
    })
})

router.post('/getEXP', ensureAuthenticated, function(req, res){
    Medal.getEXP(glob_user_obj.username, function(goal){
        res.status(200).send(goal);
    })
})

router.post('/getWalk', ensureAuthenticated, function(req, res){
    Medal.getWalk(glob_user_obj.username, function(goal){
        res.status(200).send(goal);
    })
})

router.post('/getPost', ensureAuthenticated, function(req, res){
    Medal.getPost(glob_user_obj.username, function(goal){
        res.status(200).send(goal);
    })
})

router.post('/getMessage', ensureAuthenticated, function(req, res){
    Medal.getMessage(glob_user_obj.username, function(goal){
        res.status(200).send(goal);
    })
})

router.post('/getLevel', ensureAuthenticated, function(req, res){
    Medal.getLevel(glob_user_obj.username, function(goal){
        res.status(200).send(goal);
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