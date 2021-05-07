var express = require('express');
var router = express.Router();
var empty = require('is-empty');
var multer = require('multer');
var upload = multer({
    dest: './uploads_poop_img',
});
var Poop = require('../models/poop');
const { NotExtended } = require('http-errors');

//var pooptime = [];
var fs = require('fs')
var pooptime = JSON.parse(fs.readFileSync(`${__dirname}/poops.json`))

//get 3
router.get('/', function (req, res, next) {
    var poop3 = []
    Poop.getPoopByPooptime(pooptime.time[0], function (err, Poopget1) {
        if (err) throw err;
        console.log(Poopget1);
        let content = {};
        content["id"] = Poopget1._id;
        content["time"] = Poopget1.time;
        content["title"] = Poopget1.title;
        content["text"] = Poopget1.text;
        content["img"] = Poopget1.img;
        content["comment"] = Poopget1.comment;
        poop3.push(content)

        Poop.getPoopByPooptime(pooptime.time[1], function (err, Poopget2) {
            if (err) throw err;
            console.log(Poopget2);
            let content = {};
            content["id"] = Poopget2._id;
            content["time"] = Poopget2.time;
            content["title"] = Poopget2.title;
            content["text"] = Poopget2.text;
            content["img"] = Poopget2.img;
            content["comment"] = Poopget2.comment;
            poop3.push(content)

            Poop.getPoopByPooptime(pooptime.time[2], function (err, Poopget3) {
                if (err) throw err;
                console.log(Poopget3);
                let content = {};
                content["id"] = Poopget3._id;
                content["time"] = Poopget3.time;
                content["title"] = Poopget3.title;
                content["text"] = Poopget3.text;
                content["img"] = Poopget3.img;
                content["comment"] = Poopget3.comment;
                poop3.push(content)
                res.status(200).send(JSON.stringify(poop3));
            });
        });
    });

});

router.post('/', function (req, res, next) {
    var poop = JSON.parse(req.body)
    var time = poop.time;
    var title = poop.title;
    var text = poop.text;
    var img = poop.imgid;

    console.log(time);
    console.log(title);
    console.log(text);
    console.log(img);

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
        var newPoop = new Poop({
            time: time,
            title: title,
            text: text,
            img: img,
            comment: []
        });
        Poop.createPoop(newPoop, function (err, newPoop) {
            if (err) throw err;
            console.log(newPoop);
            //pooptime.push(newPoop.time)
            pooptime.time.unshift(newPoop.time)
            let newpooptime = JSON.stringify(pooptime, null, '\t')
            fs.writeFile(`${__dirname}/poops.json`, newpooptime, (err) => {
                if (err) throw err
                var id = {};
                id["id"] = newPoop._id;
                res.status(200).send(JSON.stringify(id));
            })
            /*
            var id = {};
            id["id"] = newPoop._id;
            res.status(200).send(JSON.stringify(id));
            */
        });
    }
});

router.post('/comment', function (req, res, next) {
    var comment = JSON.parse(req.body.comment);
    Poop.setPoopComment(comment.id, comment.time, comment.text, comment.user_name, function (err) {
        res.status(200).send();
    });
})

/*
router.delete('/', function (req, res, next) {
    var poop = JSON.parse(req.body.poop)
    Poop.deletePoopByPoopId(poop.id, function (err) {
        res.status(200).send();
    });
});


router.get('/one', function (req, res, next) {
    var poop = JSON.parse(req.body.poop) 
    Poop.getPoopByPooptime(poop.time, function (err, Poopget) {
        if (err) throw err;
        if (!Poopget) {
          return done(null, false, { message: 'Unknown Poop' });
        }
        console.log(Poopget);        
        var content = {};
        content["title"]  =Poopget.title;
        content["text"]  =Poopget.text;
        res.status(200).send(content);
    });    
});
*/

module.exports = router;