//Introduce library------------------------------------------------------------------
var express = require('express');
var router = express.Router();
var multer = require('multer');
var upload = multer({ dest: './uploads' });
var empty = require('is-empty');
var Isemail = require('isemail');
var isEqual = require('is-equal');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var randomstring = require("randomstring");
//Introduce library------------------------------------------------------------------
//Import password or private key file------------------------------------------------------------------

//Import password or private key file------------------------------------------------------------------
app.get('/facebook',
  passport.authenticate('facebook'));

router.get('/', ensureAuthenticated, function (req, res, next) {
    //console.log("router.post(__/selectanimal__, ensureAuthenticated, function(req, res, next) {");
    //res.status(200).json({ "exampleKey": "exampleValue" });
    res.render('appsel', { title: 'appsel' });
});

function ensureAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        console.log("====================================");
        console.log(req.user);
        return next();
    }
    res.redirect('/users/login');
}

module.exports = router;