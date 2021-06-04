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

    Img.getImgById(req.query.Id, function (err, Imgget) {
        res.status(200).send(JSON.stringify(Imgget));
    })

});

router.post('/get', /*ensureAuthenticated,*/ function (req, res, next) {
    /*if (DEF_DEBUG) {
        console.log("+++++++++");
        console.log(glob_user_obj);
    }
    var user_name = glob_user_obj.username;*/

    Img.getImgById(req.query.Id, function (err, Imgget) {
        res.status(200).res.sendFile(Imgget.content);

    })

});

router.get('/gallery', ensureAuthenticated, function (req, res, next) {
    if (DEF_DEBUG) {
        console.log("+++++++++");
        console.log(glob_user_obj);
    }
    var user_name = glob_user_obj.username;
    query = JSON.parse(req.query.query)
    if (!query.scroll) {
        let date = new Date();
        req.cookies.last_img_time = date 
    }
    var last_img_time = req.cookies.last_img_time
    var number_of_img = query.number_of_img
    var imgarray = []
    Img.getMultiImgByUsername(user_name, last_img_time, number_of_img, function (err, Imgsget) {
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
        res.cookie('last_img_time', `${Imgsget[number_of_img - 1].time}`, {
            secure: true,
            httpOnly: true,
            path: '/app/img/gallery',
        })
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
    //var time = img.time;
    var user_name = glob_user_obj.username;
    var title = glob_user_obj.username.toString()+Date.now().toString()+".jpg";
    var content = img.content;

    var error_msg_res = {};
    /*if (empty(time)) {
        error_msg_res["time"] = "empty";
    }*/
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
            time: Date.now().toString(),
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
