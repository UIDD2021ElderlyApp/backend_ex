var express = require('express');
var router = express.Router();
var empty = require('is-empty');

var Reward = require('../models/Reward');

router.get('/', function (req, res, next) {
    res.send('respond with a resource');
});

router.get('/reward', function(req, res){
    var token = req.body.token;
    var exp = req.body.exp;
    var food = req.body.food;
    var dessert = req.body.dessert;

    console.log(token);
    console.log(exp);
    console.log(food);
    console.log(dessert);
    var error_msg_res = {};
    // error detection !!!
    if(empty(token))
    {
        error_msg_res["token"] = "empty";
    }
    if(empty(exp))
    {
        error_msg_res["exp"] = "empty";
    }
    if(empty(food))
    {
        error_msg_res["food"] = "empty";
    }
    if(empty(dessert))
    {
        error_msg_res["dessert"] = "empty";
    }

    console.log(error_msg_res);

    if(!empty(error_msg_res))
    {
        res.render('reward', {
            errors: error_msg_res
        });
    }
    else
    {
        res.status(200);
        var newReward = new Reward({
            token: token,
            exp: exp,
            food: food,
            dessert: dessert
        });
        Reward.createReward(newReward, function(err, newReward){
            if(err) throw err;
            console.log(newReward);
        });
        res.status(200).send();
    }
});

router.put('/reward', function(req, res){
    Reward.setReward(req.body.reward, function(err){
        res.status(200).send();
    });
});


router.post('/view', function (req, res, next) {
    Reward.getRewardById(req.body.Id, function (err, Rewardget) {
        if (err) throw err;
        if (!Rewardget) {
            return done(null, false, { message: 'Unknown Post' });
        }
        console.log(Rewardget);
        var content = {};
        content["exp"] = Rewardget.exp;
        content["food"] = Rewardget.food;
        content["dessert"] = Rewardget.dessert;
        res.status(200).send(content);
    });

});

module.exports = router;