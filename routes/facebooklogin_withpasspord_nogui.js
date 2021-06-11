//Introduce library------------------------------------------------------------------
var express = require('express');
var router = express.Router();
var passport = require('../config/passport');

//Introduce library------------------------------------------------------------------

router.get('/facebook', passport.authenticate('facebook'/*, { scope: ['profileUrl', 'emails' ] }*/));

router.get('/facebook/callback',
    passport.authenticate('facebook', {
        successRedirect: '/main',
        failureRedirect: '/users/login'
    }));

module.exports = router;