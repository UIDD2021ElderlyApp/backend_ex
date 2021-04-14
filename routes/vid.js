var express = require('express');
var tableify=require('tableify');
var router = express.Router();

var viddata = require('../models/viddata');

router.get('/add', ensureAuthenticated, function (req, res, next) {
    console.log("viddata get ...")
    res.render('vid', { title: 'vid' });
});

router.post('/add', ensureAuthenticated, function (req, res, next) {
    var adddata = new viddata({
        vidindex: req.body.vidindex,
        vidtitle: req.body.vidtitle,
        vidlocalurl: req.body.vidlocalurl,
        vidhash: req.body.vidhash,
        vidgoogleurl: req.body.vidgoogleurl,
        viddescription: req.body.viddescription,
        vidclass: req.body.vidclass,
        vidsee: req.body.vidsee
    });
    viddata.updata(adddata, function (err, cllbackfoo) {
        //track for error
        if (err) throw err;
        console.log(cllbackfoo);
    });
    //Show success message with flash
    req.flash('success', 'data uploaded');
    res.location('/');
    res.redirect('/');

});

router.post('/list', ensureAuthenticated, function (req, res, next) {
    res.send(tableify(JSON.stringify(viddata.listall())));

    /*TODO:
*幹卡在這裡啦
    */
});

function ensureAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect('/users/login');
}

module.exports = router;