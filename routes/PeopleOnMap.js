var express = require('express');
var router = express.Router();
var empty = require('is-empty');

var PersonOnMap = require('../models/PersonOnMap');

var DEF_DEBUG = true;
var glob_user_obj;

router.get('/', function (req, res, next) {
    console.log(req.body);
    var time = new Date().getTime();
    var distance = req.body.distance;
    var position = req.body.position;

    var People = []
    PersonOnMap.getMultiPersonOnMapByPosition(time, position, distance, function (err, PersonOnMapsget) {
        PersonOnMapsget.forEach(PersonOnMapget => {
            if (err) throw err;
            if (DEF_DEBUG) {
                console.log("+++++++++-----------");
                console.log(PersonOnMapget);
            }
            let content = {};
            content["id"] = PersonOnMapget._id;
            content["user_name"] = PersonOnMapget.user_name;
            content["animal"] = PersonOnMapget.animal;
            content["position"] = PersonOnMapget.position;
            People.push(content)
        })
        res.status(200).send(JSON.stringify(People));
    })
});

router.post('/', ensureAuthenticated, function (req, res, next) {
    if (DEF_DEBUG) {
        console.log("+++++++++");
        console.log(glob_user_obj);
    }
    console.log(req.body);
    var Person = req.body;
    var user_name = glob_user_obj.username;
    var name = glob_user_obj.name;
    var time = new Date().getTime();
    var animal = Person.animal;
    var position = Person.position;

    if (DEF_DEBUG) {
        console.log("+++++++++");
        console.log(user_name);
        console.log(name);
        console.log(time);
        console.log(animal);
        console.log(position);
    }

    PersonOnMap.setPersonOnMapPosition(time, user_name, position, function (err, newPerson) {
        if (!newPerson) {
            res.status(200).send();
        }
        else {//create
            var newPersonOnMap = new PersonOnMap({
                last_update_time: time,
                user_name: user_name,
                name: name,
                animal: animal,
                position: position
            });
            PersonOnMap.createPersonOnMap(newPersonOnMap, function (err, newPersonOnMap) {
                if (err) throw err;
                console.log("newPersonOnMap");
                console.log(newPersonOnMap);
                var id = {};
                id["id"] = newPersonOnMap._id;
                res.status(200).send(JSON.stringify(id));
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
