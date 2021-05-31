var express = require('express');
var router = express.Router();
var empty = require('is-empty');

var Img = require('../models/img');

var DEF_DEBUG = true;
var glob_user_obj;

var cookies = require('cookie-parser');
router.use(cookies());

router.get('/', /*ensureAuthenticated,*/ function (req, res, next) {
    /*if (DEF_DEBUG) {
        console.log("+++++++++");
        console.log(glob_user_obj);
    }
    var user_name = glob_user_obj.username;*/
    Img.getImgById(req.body.Id, function (err, Imgget) {
        res.status(200).send(JSON.stringify(Imgget));
    })

});

router.get('/gallery', ensureAuthenticated, function (req, res, next) {
    if (DEF_DEBUG) {
        console.log("+++++++++");
        console.log(glob_user_obj);
    }
    var user_name = glob_user_obj.username;
    if (!req.cookies.time) {
        let date = new Date(2077, 7, 7);
        res.cookie('lastimgtime', `${date}`, {
            secure: true,
            //httpOnly: true,
            //path: '',
          })
    }
    var lastimgtime = req.cookies.lastimgtime
    var number_of_img = req.body.number_of_img
    var imgarray = []
    Img.getMultiImgByUsername(user_name, lastimgtime, number_of_img, function (err, Imgsget) {
        Imgsget.forEach(Imgget => {
            if (err) throw err;
            if (DEF_DEBUG) {
                console.log("+++++++++-----------");
                console.log(Imgget);
            }
            let content = {};
            content["id"] = Imgget._id;
            content["time"] = Imgget.time;
            content["user_name"] = Imgget.user_name;
            content["title"] = Imgget.title;
            content["content"] = Imgget.content;
            imgarray.push(content)
        })
        res.cookie('lastimgtime', `${imgarray[number_of_img - 1 ].time}`)
        res.status(200).send(JSON.stringify(imgarray));
    })

});

router.post('/', ensureAuthenticated, function (req, res, next) {
    if (DEF_DEBUG) {
        console.log("+++++++++");
        console.log(glob_user_obj);
    }
    console.log(req.body);
    var img = req.body;
    var time = img.time;
    var user_name = glob_user_obj.username;
    var title = img.title;
    var content = img.content;

    var error_msg_res = {};
    if (empty(time)) {
        error_msg_res["time"] = "empty";
    }
    if (empty(content)) {
        error_msg_res["content"] = "empty";
    }

    if (DEF_DEBUG) {
        console.log("+++++++++");
        console.log(time);
        console.log(user_name);
        console.log(title);
        console.log(content);
        console.log(error_msg_res);
    }

    if (!empty(error_msg_res)) {
        //res.status(400).json(error_msg_res);
        res.render('build', {
            errors: error_msg_res
        });
    } else {
        var newImg = new Img({
            time: time,
            user_name: user_name,
            title: title,
            content: content
        });
        Img.createImg(newImg, function (err, newImg) {
            if (err) throw err;
            console.log(newImg);
            var id = {};
            id["id"] = newImg._id;
            res.status(200).send(JSON.stringify(id));
        });
    }
});

function ensureAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        glob_user_obj = req.user;
        return next();
    }
    res.redirect('/users/login');
}

module.exports = router;


/*
router.delete('/', function (req, res, next) {
    var img = JSON.parse(req.body.img)
    Img.deleteImgByImgId(img.id, function (err) {
        res.status(200).send();
    });
});
 
 
router.get('/one', function (req, res, next) {
    var img = JSON.parse(req.body.img) 
    Img.getImgByImgtime(img.time, function (err, Imgget) {
        if (err) throw err;
        if (!Imgget) {
          return done(null, false, { message: 'Unknown Img' });
        }
        console.log(Imgget);        
        var content = {};
        content["title"]  =Imgget.title;
        content["text"]  =Imgget.text;
        res.status(200).send(content);
    });    
});
*/
