var express = require('express');
var router = express.Router();
var empty = require('is-empty');

var Middatatmp = require('../models/Middatatmp');

var DEF_DEBUG = false;
var glob_user_obj;

router.get('/', ensureAuthenticated, function (req, res, next) {
    if (DEF_DEBUG) {
        console.log("+++++++++");
        console.log("glob_user_obj.username :" + glob_user_obj.username);
    }
    var user_name = glob_user_obj.username;

    Middatatmp.getMiddatatmp(user_name, function (err, Middatatmpget) {
        if (err) throw err;
        if (DEF_DEBUG) {
            console.log("+++++++++-----------");
            console.log(Middatatmpget);
        }
        res.status(200).send(JSON.parse(Middatatmpget.tmp_to_set));
    })
});


router.post('/', ensureAuthenticated, function (req, res, next) {
    if (DEF_DEBUG) {
        console.log("+++++++++");
        console.log("glob_user_obj.username :" + glob_user_obj.username);
    }
    console.log("req.body is :");
    console.log(req.body);
    var tmmp = req.body.tmp;
    var user_name = glob_user_obj.username;

    if (DEF_DEBUG) {
        console.log("+++++++++");
        console.log(user_name);
        console.log(tmmp);
    }

    Middatatmp.setMiddatatmp(user_name, tmmp, function (newmiddatatmp) {
        if (!newmiddatatmp) {
            res.status(200).send("success");
        }
        else {//create
            var newMiddatatmp = new Middatatmp({
                user_name: user_name,
                tmp_to_set: tmmp,
            });
            Middatatmp.createMiddatatmp(newMiddatatmp, function (err, newMiddatatmp) {
                if (err) throw err;
                console.log("newMiddatatmp : ");
                console.log(newMiddatatmp);
                res.status(200).send("success");
            });
        }
    })
});


function ensureAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        glob_user_obj = req.user;
        return next();
    }
    res.redirect('/users/login');
}

module.exports = router;
