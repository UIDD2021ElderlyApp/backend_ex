var express = require('express');
var router = express.Router();
var empty = require('is-empty');

var out = require('../models/out');

router.post('/create', function(req, res){
    var outdoor = JSON.parse(req.body.outdoor)
    var user_id = outdoor.user_id;
    //var path_distance = req.body.path_distance;

    console.log(user_id);
    //console.log(path_distance);
    var error_msg_res = {};
    // error detection !!!
    if(empty(user_id))
    {
        error_msg_res["user_id"] = "empty";
    }
    /*
    if(empty(path_distance))
    {
        error_msg_res["path_distance"] = "empty";
    }
    */

    console.log(error_msg_res);

    if(!empty(error_msg_res))
    {
        res.render('outdoor', {
            errors: error_msg_res
        });
    }
    else
    {
        var newout = new out({
            user_id: user_id,
            path_distance: 0
            //path_distance: path_distance
        });
        out.createout(newout, function(err, newout){
            if(err) throw err;
            console.log(newout);
        });
        res.status(200).send();
    }
});

router.get('/', function (req, res, next) {
    out.getoutByuser_id(req.body.outdoor, function (err, outget) {
        if (err) throw err;
        console.log(outget);
        var content = {};
        content["path_distance"] = outget.path_distance;
        res.status(200).send(JSON.stringify(content));
    });
});

router.post('/', function(req, res){
    out.postout(req.body.outdoor, function(err){
        res.status(200).send();
    });
});

router.put('/', function(req, res){
    out.setout(req.body.outdoor, function(err){
        res.status(200).send();
    });
});


module.exports = router;