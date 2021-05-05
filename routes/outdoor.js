var express = require('express');
var router = express.Router();
var empty = require('is-empty');

var out = require('../models/out');

router.get('/', function (req, res, next) {
    res.send('respond with a resource');
});

router.get('/outdoor', function(req, res){
    var token = req.body.token;
    var path_distance = req.body.path_distance;

    console.log(token);
    console.log(path_distance);
    var error_msg_res = {};
    // error detection !!!
    if(empty(token))
    {
        error_msg_res["token"] = "empty";
    }
    if(empty(path_distance))
    {
        error_msg_res["path_distance"] = "empty";
    }

    console.log(error_msg_res);

    if(!empty(error_msg_res))
    {
        res.render('outdoor', {
            errors: error_msg_res
        });
    }
    else
    {
        res.status(200);
        var newout = new out({
            token: token,
            path_distance: path_distance
        });
        out.createout(newout, function(err, newout){
            if(err) throw err;
            console.log(newout);
        });
        res.status(200).send();
    }
});

router.put('/outdoor', function(req, res){
    out.setout(req.body.outdoor, function(err){
        res.status(200).send();
    });
});


router.post('/view', function (req, res, next) {
    out.getoutById(req.body.Id, function (err, outget) {
        if (err) throw err;
        if (!outget) {
            return done(null, false, { message: 'Unknown Post' });
        }
        console.log(outget);
        var content = {};
        content["path_distance"] = outget.path_distance;
        res.status(200).send(content);
    });

});

module.exports = router;