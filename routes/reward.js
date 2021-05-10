/*
This is an edit message
First, say sorry to the person who originally wrote this code
Because this code cannot be executed smoothly
And there are many errors in logic
I modified most of the content without authorization
The modified code still has many places to be corrected
If there's a problem
Please contact me
andythebreaker
*/
var DEF_DEBUG = true;

var express = require('express');
var router = express.Router();
var empty = require('is-empty');

var glob_user_obj;

var Reward = require('../models/Reward');

router.post('/', function (req, res) {
    var exp = req.body.exp;
    var food = req.body.food;
    var dessert = req.body.dessert;
    Reward.setReward(glob_user_obj.username, exp, food, dessert, function (db_have_data) {
        if (db_have_data === -1) {
            if (DEF_DEBUG) {
                console.log(exp);
                console.log(food);
                console.log(dessert);
            }
            var newReward = new Reward({
                exp: exp,
                food: food,
                dessert: dessert
            });
            Reward.createReward(newReward, function (err, newReward) {
                if (err) throw err;
                console.log(newReward);
            });
        }
    });

    res.status(200).send();

});

router.get('/', ensureAuthenticated, function (req, res, next) {
    if (DEF_DEBUG) {
        console.log("+++++++++");
        console.log(glob_user_obj);
    }
    Reward.getRewardByUserId(glob_user_obj.username, function (err, Rewardget) {
        if (err) {
            console.log(err);
            throw err;
        }
        if (!Rewardget) {
            console.log("Rewardget is empty!!!");
        }
        if (DEF_DEBUG) {
            console.log("+++++++++-----------");
            console.log(Rewardget);
        }
        var content = {};
        content["exp"] = Rewardget[0].exp;
        content["food"] = Rewardget[0].food;
        content["dessert"] = Rewardget[0].dessert; if (DEF_DEBUG) {
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