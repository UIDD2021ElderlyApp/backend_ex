var express = require('express');
var router = express.Router();
var empty = require('is-empty');

var Mission = require('../models/miss');

router.get('/', function (req, res, next) {
    res.send('respond with a resource');
});

router.get('/mission', function(req, res){
    var token = req.body.token;
    var type = req.body.type;
    var goal = req.body.goal;

    console.log(token);
    console.log(type);
    console.log(goal);
    var error_msg_res = {};
    // error detection !!!
    if(empty(token))
    {
        error_msg_res["token"] = "empty";
    }
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
            token: token,
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