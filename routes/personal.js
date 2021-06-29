var express = require('express');
var router = express.Router();

var Person = require('../models/Personal');

var DEF_DEBUG = false;
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
            person["getup_time"] = {hh:Personget.getup_time[0],mm:Personget.getup_time[1]};
            person["sleep_time"] = {hh:Personget.sleep_time[0],mm:Personget.sleep_time[1]};
            person["is_sleep"] = Personget.is_sleep;
            res.status(200).send(person);
        }
        else {
            res.status(200).send(-1);
        }
    });
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
        sleep_time: [22, 00],
        is_sleep: false
    });
    Person.createPersonal(newPerson, function (err, newPerson) {
        if (err) throw err;
        console.log("newPerson : ");
        console.log(newPerson);
        var id = {};
        id["id"] = newPerson._id;
        //res.status(200).send(JSON.stringify(id));
        res.status(200).send("success");
    });
});


router.post('/getup', ensureAuthenticated, function (req, res, next) {
    if (DEF_DEBUG) {
        console.log("+++++++++");
        console.log("glob_user_obj.username :" + glob_user_obj.username);
    }
    var user_name = glob_user_obj.username;
    var getup_time_0 = req.body.getup_time_0;
    var getup_time_1 = req.body.getup_time_1;
    var getup_time = [getup_time_0, getup_time_1];
    //console.log("wTF");
    if (DEF_DEBUG) console.log(getup_time);
    if (is_time_valid(getup_time)) {
        Person.setPersonalgetup_time(user_name, getup_time, function (err) {
            if (err) throw err
            res.send(200)
        })
    }
    else
        res.status(406).send()
});

router.post('/sleep', ensureAuthenticated, function (req, res, next) {
    if (DEF_DEBUG) {
        console.log("+++++++++");
        console.log("glob_user_obj.username :" + glob_user_obj.username);
    }
    var user_name = glob_user_obj.username;
    var sleep_time_0 = req.body.sleep_time_0;
    var sleep_time_1 = req.body.sleep_time_1;
    var sleep_time = [sleep_time_0, sleep_time_1];
    //console.log("wTF");
    if (DEF_DEBUG) console.log(sleep_time);
    if (is_time_valid(sleep_time)) {
        Person.setPersonalsleep_time(user_name, sleep_time, function (err) {
            if (err) throw err
            res.send(200)
        })
    }
    else
        res.status(406).send()
});

router.post('/is_sleep', ensureAuthenticated, function (req, res, next) {
    if (DEF_DEBUG) {
        console.log("+++++++++");
        console.log("glob_user_obj.username :" + glob_user_obj.username);
    }
    var user_name = glob_user_obj.username;
    var is_sleep = req.body.is_sleep;
    if (DEF_DEBUG) console.log(is_sleep);
    Person.setPersonalis_sleep(user_name, is_sleep, function (err) {
        if (err) throw err
        res.send(200)
    });
});

router.get('/kill', ensureAuthenticated, function (req, res, next) {
    if (DEF_DEBUG) {
        console.log("+++++++++");
        console.log("glob_user_obj.username :" + glob_user_obj.username);
    }
    var user_name = glob_user_obj.username;
    Person.deletePersonal(user_name, function (err) {
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

function is_time_valid(time) {
    let time_hour = time[0]
    let time_minute = time[1]
    if (!time_hour || !time_minute)
        return false
    else if (time_hour > 24 || time_hour < 0)
        return false
    else if (time_minute > 60 || time_minute < 0)
        return false
    else
        return true
}