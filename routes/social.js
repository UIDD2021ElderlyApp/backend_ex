var express = require('express');
var router = express.Router();
var multer = require('multer');
var upload = multer({ dest: './uploads' });
var empty = require('is-empty');

var Post = require('../models/post');
const { NotExtended } = require('http-errors');

router.get('/', function (req, res, next) {
    res.send('respond with a resource');
});

router.post('/build', upload.single('image'), function (req, res, next) {
    var time = req.body.time;
    var title = req.body.title;
    var text = req.body.text;

    var like = req.body.like;
    var message = req.body.message;

    console.log(time);
    console.log(title);
    console.log(text);

    console.log(like);
    console.log(message);
    var error_msg_res = {};

    if (empty(time)) {
        error_msg_res["time"] = "empty";
    }
    if (empty(title)) {
        error_msg_res["title"] = "empty";
    }

    if (req.file) {
        console.log('Uploading image...');
        var image = req.file.image.filename;
    } else {
        var image = 'default.jpg';
    }

    console.log(error_msg_res);
    if (!empty(error_msg_res)) {
        res.render('build', {
            errors: error_msg_res
        });
    } else {
        res.status(200);
        var newPost = new Post({
            PostTime: time,
            title: title,
            text: text,
            image: image,
            like: like,
            message: message
        });
        Post.createPost(newPost, function (err, newPost) {
            //track for error
            if (err) throw err;
            console.log(newPost);
        });
    }
    res.redirect('/users/login');

});

router.post('/message', function (req, res, next) {
    Post.setPostMessage(req.body.posttitle, req.body.message, function (err) {
        res.status(200).send();
    });
});

router.post('/like', function (req, res, next) {
    Post.setPostLike(req.body.posttitle, req.body.like, function (err) {
        res.status(200).send();
    });
});

router.get('/view', function (req, res, next) {
    Post.getPostByPosttitle(req.body.posttitle, function (err, Postget) {
        if (err) throw err;
        if (!Postget) {
          return done(null, false, { message: 'Unknown Post' });
        }
        console.log(Postget);        
        var context = {};
        context["text"]  =Postget.text;
        context["like"]  =Postget.like;
        context["message"]  =Postget.message;
        res.status(200).send([Postget.image, context]);
    });
    
});

module.exports = router;