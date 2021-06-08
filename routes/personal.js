var express = require('express');
var router = express.Router();
var empty = require('is-empty');

var Person = require('../models/Personal');

var DEF_DEBUG = true;
var glob_user_obj;

router.get('/', ensureAuthenticated, function (req, res, next) {
    if (DEF_DEBUG) {
        console.log("+++++++++");
        console.log("glob_user_obj.username :" + glob_user_obj.username);
    }
    var user_name = glob_user_obj.username;
    Person.getPersonal(user_name, function (err, Personget) {
        if (err) throw err;
        if (DEF_DEBUG) {
            console.log("+++++++++-----------");
            console.log(Personget);
        }
        if (Personget) {
            let person = {};
            person["id"] = Personget._id;
            person["user_name"] = Personget.user_name;
            person["name"] = Personget.name;
            person["animal"] = Personget.animal;
            person["getup_time"] = Personget.getup_time;
            person["sleep_time"] = Personget.sleep_time;
            res.status(200).send(JSON.stringify(person));
            console.log("+++++++++-----------");
        }
        else {
            res.status(200).send(JSON.stringify(-1));
        }
    })
});

router.post('/create', ensureAuthenticated, function (req, res, next) {
    if (DEF_DEBUG) {
        console.log("+++++++++");
        console.log("glob_user_obj.username :" + glob_user_obj.username);
    }
    var user_name = glob_user_obj.username;
    var name = glob_user_obj.name;
    var animal = req.body.animal;

    if (DEF_DEBUG) {
        console.log("+++++++++");
        console.log(user_name);
        console.log(name);
        console.log(animal);
    }

    var newPerson = new Person({
        user_name: user_name,
        name: name,
        animal: animal,
        getup_time: [6, 00],
        sleep_time: [22, 00]
    });
    Person.createPersonal(newPerson, function (err, newPerson) {
        if (err) throw err;
        console.log("newPerson : ");
        console.log(newPerson);
        var id = {};
        id["id"] = newPerson._id;
        res.status(200).send(JSON.stringify(id));
    });
});


router.post('/getup', ensureAuthenticated, function (req, res, next) {
    if (DEF_DEBUG) {
        console.log("+++++++++");
        console.log("glob_user_obj.username :" + glob_user_obj.username);
    }
    var user_name = glob_user_obj.username;
    var getup_time = req.body.getup_time;
    Person.setPersonalgetup_time(user_name, getup_time, function (err) {
        if (err) throw err
        res.send(200)
    })
});
router.post('/sleep', ensureAuthenticated, function (req, res, next) {
    if (DEF_DEBUG) {
        console.log("+++++++++");
        console.log("glob_user_obj.username :" + glob_user_obj.username);
    }
    var user_name = glob_user_obj.username;
    var sleep_time = req.body.sleep_time;
    Person.setPersonalsleep_time(user_name, sleep_time, function (err) {
        if (err) throw err
        res.send(200)
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
