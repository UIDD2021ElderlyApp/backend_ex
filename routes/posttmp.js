var express = require('express');
var router = express.Router();
var empty = require('is-empty');

var PostTmp = require('../models/PostTmp');

var DEF_DEBUG = true;
var glob_user_obj;

router.get('/pooptmmp', ensureAuthenticated, function (req, res, next) {
    if (DEF_DEBUG) {
        console.log("+++++++++");
        console.log("glob_user_obj.username :" + glob_user_obj.username);
    }
    var user_name = glob_user_obj.username;

    PostTmp.getPostTmp(user_name, function (err, PostTmpget) {
        if (err) throw err;
        if (DEF_DEBUG) {
            console.log("+++++++++-----------");
            console.log(PostTmpget);
        }
        let content = {};
        content["post_tmmp"] = PostTmpget.post_tmmp;
        res.status(200).send("JSON.stringify(content)");
    })
});

router.get('/poop_img_sel_tmmp', ensureAuthenticated, function (req, res, next) {
    if (DEF_DEBUG) {
        console.log("+++++++++");
        console.log("glob_user_obj.username :" + glob_user_obj.username);
    }
    var user_name = glob_user_obj.username;

    PostTmp.getPostTmp(user_name, function (err, PostTmpget) {
        if (err) throw err;
        if (DEF_DEBUG) {
            console.log("+++++++++-----------");
            console.log(PostTmpget);
        }
        let content = {};
        content["post_img_select_tmmp"] = PostTmpget.post_img_select_tmmp;
        res.status(200).send(JSON.stringify(content));
    })
});


router.post('/pooptmmp', ensureAuthenticated, function (req, res, next) {
    if (DEF_DEBUG) {
        console.log("+++++++++");
        console.log("glob_user_obj.username :" + glob_user_obj.username);
    }
    console.log("req.body is :");
    console.log(req.body);
    var tmmp = req.body;
    var user_name = glob_user_obj.username;
    var time = new Date().getTime();
    var post_tmmp = tmmp.post_tmmp;

    if (DEF_DEBUG) {
        console.log("+++++++++");
        console.log(user_name);
        console.log(time);
        console.log(post_tmmp);
    }

    PostTmp.setPostTmp(time, user_name, post_tmmp, 1, function (newPerson) {
        if (!newPerson) {
            res.status(200).send("success");
        }
        else {//create
            var newPostTmp = new PostTmp({
                last_update_time: time,
                user_name: user_name,
                post_tmmp: post_tmmp
            });
            PostTmp.createPostTmp(newPostTmp, function (err, newPostTmp) {
                if (err) throw err;
                console.log("newPostTmp : ");
                console.log(newPostTmp);
                var id = {};
                id["id"] = newPostTmp._id;
                res.status(200).send("success");
            });
        }
    })
});

router.post('/poop_img_sel_tmmp', ensureAuthenticated, function (req, res, next) {
    if (DEF_DEBUG) {
        console.log("+++++++++");
        console.log("glob_user_obj.username :" + glob_user_obj.username);
    }
    console.log("req.body is :");
    console.log(req.body);
    var tmmp = req.body;
    var user_name = glob_user_obj.username;
    var time = new Date().getTime();
    var post_img_select_tmmp = tmmp.post_img_select_tmmp;

    if (DEF_DEBUG) {
        console.log("+++++++++");
        console.log(user_name);
        console.log(time);
        console.log(post_img_select_tmmp);
    }

    PostTmp.setPostTmp(time, user_name, post_img_select_tmmp, 2, function (newPerson) {
        if (!newPerson) {
            res.status(200).send("success");
        }
        else {//create
            var newPostTmp = new PostTmp({
                last_update_time: time,
                user_name: user_name,
                post_img_select_tmmp: post_img_select_tmmp
            });
            PostTmp.createPostTmp(newPostTmp, function (err, newPostTmp) {
                if (err) throw err;
                console.log("newPostTmp : ");
                console.log(newPostTmp);
                var id = {};
                id["id"] = newPostTmp._id;
                res.status(200).send("success");
            });
        }
    })
});

router.get('/poop_tmmp_clear', ensureAuthenticated, function (req, res, next) {
    if (DEF_DEBUG) {
        console.log("+++++++++");
        console.log("glob_user_obj.username :" + glob_user_obj.username);
    }
    var user_name = glob_user_obj.username;
    var time = new Date().getTime();

    if (DEF_DEBUG) {
        console.log("+++++++++");
        console.log(user_name);
        console.log(time);
    }

    PostTmp.setPostTmp(time, user_name, "", 0, function (newPerson) {
        if (!newPerson) {
            res.status(200).send();
        }
        else {//create
            var newPostTmp = new PostTmp({
                last_update_time: time,
                user_name: user_name,
            });
            PostTmp.createPostTmp(newPostTmp, function (err, newPostTmp) {
                if (err) throw err;
                console.log("newPostTmp : ");
                console.log(newPostTmp);
                var id = {};
                id["id"] = newPostTmp._id;
                res.status(200).send(JSON.stringify(id));
            });
        }
    })
});



router.post('/delete_poop_tmmp', ensureAuthenticated, function (req, res, next) {
    if (DEF_DEBUG) {
        console.log("+++++++++");
        console.log("glob_user_obj.username :" + glob_user_obj.username);
    }
    var user_name = glob_user_obj.username;
    PostTmp.deletePostTmpByuser_name(user_name, function (err) {
        if (err) throw err;
        res.send(200)
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
