//Introduce library------------------------------------------------------------------
var express = require('express');
var router = express.Router();
var passport = require('../config/passport');

//Introduce library------------------------------------------------------------------

router.get('/facebook', passport.authenticate('facebook'));

router.get('/facebook/callback',
    passport.authenticate('facebook', {
        successRedirect: '/app/sel',
        failureRedirect: '/users/login'
    }));

module.exports = router;