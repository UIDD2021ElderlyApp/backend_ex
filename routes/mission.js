var express = require('express');
var router = express.Router();
var empty = require('is-empty');

var glob_user_obj;

var Mission = require('../models/mission');

router.get('/', function(req, res){
    var type = req.body.type;
    var goal = req.body.goal;

    console.log(type);
    console.log(goal);
    var error_msg_res = {};
    // error detection !!!
    if(empty(type))
    {
        error_msg_res["type"] = "empty";
    }
    if(empty(goal))
    {
        error_msg_res["goal"] = "empty";
    }

    console.log(error_msg_res);

    if(!empty(error_msg_res))
    {
        res.render('mission', {
            errors: error_msg_res
        });
    }
    else
    {
        res.status(200);
        var newMission = new Mission({
            type: type,
            goal: goal
        });
        Mission.createMission(newMission, function(err, newMission){
            if(err) throw err;
            console.log(newMission);
        });
        res.status(200).send();
    }
});

router.put('/control/walk', function(req, res){
    var dist = req.body.goal;
    Mission.setMission(glob_user_obj.username, dist)
});

router.put('/mission', function(req, res){
    Mission.setMission(req.body.mission, function(err){
        res.status(200).send();
    });
});


router.post('/view', function (req, res, next) {
    Mission.getMissionById(req.body.Id, function (err, Missionget) {
        if (err) throw err;
        if (!Missionget) {
            return done(null, false, { message: 'Unknown Post' });
        }
        console.log(Missionget);
        var content = {};
        content["type"] = Missionget.type;
        content["goal"] = Missionget.goal;
        res.status(200).send(content);
    });

});

module.exports = router;