var express = require('express');
var router = express.Router();
var empty = require('is-empty');

var Keep = require('../models/keep');
const { NotExtended } = require('http-errors');

//var keeptime = [];
var fs = require('fs')
var keeptime = JSON.parse(fs.readFileSync(`${__dirname}/keeps.json`))

//get 3
router.get('/', function (req, res, next) {
    var keep3 = []
    Keep.getKeepByKeeptime(keeptime.time[0], function (err, Keepget1) {
        if (err) throw err;
        console.log(Keepget1);
        let content = {};
        content["id"] = Keepget1.Id;
        content["time"] = Keepget1.time;
        content["title"] = Keepget1.title;
        content["text"] = Keepget1.text;
        keep3.push(content)

        Keep.getKeepByKeeptime(keeptime.time[1], function (err, Keepget2) {
            if (err) throw err;
            console.log(Keepget2);
            let content = {};
            content["id"] = Keepget2.Id;
            content["time"] = Keepget2.time;
            content["title"] = Keepget2.title;
            content["text"] = Keepget2.text;
            keep3.push(content)
            
            Keep.getKeepByKeeptime(keeptime.time[2], function (err, Keepget3) {
                if (err) throw err;
                console.log(Keepget3);
                let content = {};
                content["id"] = Keepget3.Id;
                content["time"] = Keepget3.time;
                content["title"] = Keepget3.title;
                content["text"] = Keepget3.text;
                keep3.push(content)
                res.status(200).send(JSON.stringify(keep3));
            });
        });
    });

});

router.post('/', function (req, res, next) {
    var keep = JSON.parse(req.body.keep)
    var time = keep.time;
    var title = keep.title;
    var text = keep.text;

    console.log(time);
    console.log(title);
    console.log(text);

    var error_msg_res = {};

    if (empty(time)) {
        error_msg_res["time"] = "empty";
    }

    console.log(error_msg_res);
    if (!empty(error_msg_res)) {
        //res.status(400).json(error_msg_res);
        res.render('build', {
            errors: error_msg_res
        });
    } else {
        var newKeep = new Keep({
            time: time,
            title: title,
            text: text,
        });
        Keep.createKeep(newKeep, function (err, newKeep) {
            if (err) throw err;
            console.log(newKeep);
            //keeptime.push(newKeep.time)
            keeptime.time.push(newKeep.time)
            let newkeeptime = JSON.stringify(keeptime, null, '\t')
            fs.writeFile(`${__dirname}/keeps.json`, newkeeptime, (err) =>{
                if(err) throw err
                var id = {};
                id["id"] = newKeep._id;
                res.status(200).send(JSON.stringify(id));
            })
            /*
            var id = {};
            id["id"] = newKeep._id;
            res.status(200).send(JSON.stringify(id));
            */
        });
    }
});

router.delete('/', function (req, res, next) {
    var keep = JSON.parse(req.body.keep)
    Keep.deleteKeepByKeepId(keep.id, function (err) {
        res.status(200).send();
    });
});

/*
router.get('/one', function (req, res, next) {
    var keep = JSON.parse(req.body.keep) 
    Keep.getKeepByKeeptime(keep.time, function (err, Keepget) {
        if (err) throw err;
        if (!Keepget) {
          return done(null, false, { message: 'Unknown Keep' });
        }
        console.log(Keepget);        
        var content = {};
        content["title"]  =Keepget.title;
        content["text"]  =Keepget.text;
        res.status(200).send(content);
    });    
});
*/

module.exports = router;