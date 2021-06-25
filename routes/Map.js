var express = require('express');
var router = express.Router();

var Human = require('../models/human');
var coordinate = [];

router.get('/', function (req, res, next) {
    res.send('respond with a resource');
});

router.post('/coordinate', function (req, res, next) {
    var Humanget = Post.getHumanByHumanname(req.body.name);
    coordinate = Humanget.gps;
    res.status(200);
});

router.post('/othepeople', function (req, res, next) {
    var Peopleget = Human.getHumanByGPS(req.body.gps, req.body.distance);//array
    var Peopleinfo = {};
    Peopleinfo["PeopleNearby"] = Peopleget
    res.send(Peopleinfo);
});

module.exports = router;