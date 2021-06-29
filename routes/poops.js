var express = require('express');
var router = express.Router();
var empty = require('is-empty');

var Poop = require('../models/poop');

var DEF_DEBUG = false;
var glob_user_obj;
var number_each = 3;

var cookies = require('cookie-parser');
router.use(cookies());


router.get('/', function (req, res, next) {
    var query = JSON.parse(req.query.query)
    if (!query.scroll) {
        let date = new Date(2077, 7, 7);
        req.cookies.last_poop_time = date;
    }
    if (DEF_DEBUG) {
        console.log('last_poop_time is ' + `${req.cookies.last_poop_time}`);
    }
    var last_poop_time = req.cookies.last_poop_time
    number_each = query.number_of_poop
    var poops = []
    Poop.getMultiPoopByPooptime(last_poop_time, number_each, function (err, Poopsget) {
        if (!Poopsget) {
            res.status(200).send("-1");
        }
        else {
            Poopsget.forEach(Poopget => {
                if (err) throw err;
                if (DEF_DEBUG) {
                    console.log("+++++++++-----------");
                    console.log(Poopget);
                }
                let content = {};
                content["id"] = Poopget._id;
                content["time"] = Poopget.time;
                content["user_name"] = Poopget.user_name;
                content["username"] = Poopget.username;
                content["title"] = Poopget.title;
                content["text"] = Poopget.text;
                content["img"] = Poopget.img;
                content["comment"] = Poopget.comment;
                poops.push(content)
            })
            if (Poopsget.length == number_each) {
                res.cookie('last_poop_time', `${Poopsget[number_each - 1].time}`, {
                    secure: true,
                    httpOnly: true,
                    path: '/app/poop',
                })
            } else {
                res.cookie('last_poop_time', `${new Date(1970, 7, 7)}`, {
                    secure: true,
                    httpOnly: true,
                    path: '/app/poop',
                })
            }
            res.status(200).send(JSON.stringify(poops));
        }

    })//res.status(200).send("JSON.stringify(poops)");
});

router.post('/', ensureAuthenticated, function (req, res, next) {
    if (DEF_DEBUG) {
        console.log("+++++++++");
        console.log("glob_user_obj.username :" + glob_user_obj.username);
    }
    console.log("req.body is : ");
    console.log(req.body);
    var poop = req.body;
    var time = poop.time;
    //var id_time = poopget.id_time + 1;
    var user_name = glob_user_obj.name;
    var username = glob_user_obj.username;
    var title = poop.title;
    var text = poop.text;
    var img = poop.imgid;


    var error_msg_res = {};
    if (!time) {
        error_msg_res["time"] = "empty";
    }
    if (!text) {
        error_msg_res["text"] = "empty";
    }
    // if (!img) {
    //     error_msg_res["img"] = "empty";
    // }
    if (!img)
        img = "-1" 

    if (DEF_DEBUG) {
        console.log("+++++++++");
        console.log(time);
        //console.log(id_time);
        console.log(user_name);
        console.log(username);
        console.log(title);
        console.log(text);
        console.log(img);
        console.log(error_msg_res);
    }

    if (!empty(error_msg_res)) {
        res.status(406).send(error_msg_res);
    } else {
        var newPoop = new Poop({
            time: time,
            //id_time: id_time,
            user_name: user_name,
            username: username,
            title: title,
            text: text,
            img: img,
            comment: []
        });
        Poop.createPoop(newPoop, function (err, newPoop) {
            if (err) throw err;
            console.log("newPoop :");
            console.log(newPoop);
            var id = {};
            id["id"] = newPoop._id;
            res.status(200).send(JSON.stringify(id));
        });
    }
});

router.post('/comment', ensureAuthenticated, function (req, res, next) {
    if (DEF_DEBUG) {
        console.log("+++++++++");
        console.log("glob_user_obj.username :" + glob_user_obj.username);
    }
    console.log("comment===>");
    console.log(req.body);
    var comment = req.body;
    var error_msg_res = {};
    if (!comment.text) {
        error_msg_res["comment"] = "empty";
    }
    if (!empty(error_msg_res)) {
        res.status(406).send(error_msg_res);
    } else {
        Poop.setPoopComment(comment.id, glob_user_obj.name, glob_user_obj.username, comment.time, comment.text, function (err) {
            if (err) { console.log(err); }
            res.status(200).send(JSON.stringify(err));
        });
    }
})

router.get('/byId', function (req, res, next) {
    var Id = req.query.Id
    if (DEF_DEBUG) {
        console.log('Id: ' + `${Id}`);
    }
    Poop.getPoopByPoopId(Id, function (err, Poopget) {
        if (!Poopget) {
            res.status(200).send("-1");
        }
        else {
            if (err) throw err;
            if (DEF_DEBUG) {
                console.log("+++++++++-----------");
                console.log(Poopget);
            }
            let content = {};
            content["id"] = Poopget._id;
            content["time"] = Poopget.time;
            content["user_name"] = Poopget.user_name;
            content["username"] = Poopget.username;
            content["title"] = Poopget.title;
            content["text"] = Poopget.text;
            content["img"] = Poopget.img;
            content["comment"] = Poopget.comment;
            res.status(200).send(JSON.stringify(Poopget));
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
