var express = require('express');
var router = express.Router();

var PersonOnMap = require('../models/PersonOnMap');

var DEF_DEBUG = false;
var glob_user_obj;

router.get('/', ensureAuthenticated, function(req, res, next) {
    if (DEF_DEBUG) {
        console.log("+++++++++");
        console.log("glob_user_obj.username :" + glob_user_obj.username);
    }
    var user_name = glob_user_obj.username;

    console.log("req.query is :" + req.query);
    var Person = req.query;
    var time = new Date().getTime();
    var distance = Person.distance;
    // var position = JSON.parse(Person.position);
    var position = Person.position;
    console.log(position)
    var People = []
    console.log("get people")
    PersonOnMap.getMultiPersonOnMap(time, function(err, PersonOnMapsget) {
        PersonOnMapsget.forEach(PersonOnMapget => {
            if (err) throw err;
            if (DEF_DEBUG) {
                console.log("+++++++++-----------");
                console.log(PersonOnMapget);
            }
            if (distance > getDistance(position.lat, position.lng, PersonOnMapget.position.get('lat'), PersonOnMapget.position.get('lng'), "K") &&
                !(PersonOnMapget.user_name === user_name)) {
                let content = {};
                content["id"] = PersonOnMapget._id;
                content["name"] = PersonOnMapget.name;
                content["animal"] = PersonOnMapget.animal;
                content["position"] = {
                    "lat": PersonOnMapget.position.get('lat'),
                    "lng": PersonOnMapget.position.get('lng')
                };
                People.push(content)
            }
        })
        res.status(200).send(JSON.stringify(People));
    })
});


router.post('/', ensureAuthenticated, function(req, res, next) {
    if (DEF_DEBUG) {
        console.log("+++++++++");
        console.log("glob_user_obj.username :" + glob_user_obj.username);
    }
    console.log("req.body is :");
    console.log(req.body);
    var Person = req.body;
    var user_name = glob_user_obj.username;
    var name = glob_user_obj.name;
    var time = new Date().getTime();
    var animal = Person.animal;
    // var position = JSON.parse(Person.position);
    // var position = Person.position

    if (DEF_DEBUG) {
        console.log("+++++++++");
        console.log(user_name);
        console.log(name);
        console.log(time);
        console.log(animal);
        console.log(position);
    }

    PersonOnMap.setPersonOnMapPosition(time, user_name, position, function(newPerson) {
        if (!newPerson) {
            res.status(200).send();
        } else { //create
            var newPersonOnMap = new PersonOnMap({
                last_update_time: time,
                user_name: user_name,
                name: name,
                animal: animal,
                position: position
            });
            PersonOnMap.createPersonOnMap(newPersonOnMap, function(err, newPersonOnMap) {
                if (err) throw err;
                console.log("newPersonOnMap : ");
                console.log(newPersonOnMap);
                var id = {};
                id["id"] = newPersonOnMap._id;
                res.status(200).send(JSON.stringify(id));
            });
        }
    })
});

router.post('/deleteme', ensureAuthenticated, function(req, res, next) {
    if (DEF_DEBUG) {
        console.log("+++++++++");
        console.log("glob_user_obj.username :" + glob_user_obj.username);
    }
    var user_name = glob_user_obj.username;
    PersonOnMap.deletePersonOnMapByuser_name(user_name, function(err) {
        if (err) throw err;
        res.status(200).send()
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


const R = Math.PI / 180;

function getDistance(lat1, lon1, lat2, lon2, unit) {
    if ((lat1 == lat2) && (lon1 == lon2)) {
        return 0;
    } else {
        var radlat1 = Math.PI * lat1 / 180;
        var radlat2 = Math.PI * lat2 / 180;
        var theta = lon1 - lon2;
        var radtheta = Math.PI * theta / 180;
        var dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
        if (dist > 1) {
            dist = 1;
        }
        dist = Math.acos(dist);
        dist = dist * 180 / Math.PI;
        dist = dist * 60 * 1.1515;
        if (unit == "K") { dist = dist * 1.609344 }
        if (unit == "N") { dist = dist * 0.8684 }
        return dist * 100;
    }
}