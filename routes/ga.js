var express = require('express');
var router = express.Router();

router.get('/', ensureAuthenticated, function (req, res, next) {
    //console.log("router.post(__/selectanimal__, ensureAuthenticated, function(req, res, next) {");
    //res.status(200).json({ "exampleKey": "exampleValue" });
    res.render('ga', { title: 'ga' });
});

var Person = require('../models/Personal');

router.get('/', ensureAuthenticated, function (req, res, next) {
    Person.getPersonal(req.user.username, function (err, Personget) {
        if (err) throw err;
        res.render('ga', {
            title: 'ga',
            var_jade_user_info_name: `${req.user.name}`,
            var_jade_user_info_username: `${req.user.username}`,
            var_jade_user_info_profileimage: `${req.user.profileimage}`,
            var_jade_user_info_choosedanimal: `${(!Personget) ? '-1' : Personget.animal}`,
            var_use_old_jquery: false,
            var_jade_err_msg_show: false,
            var_jade_error_msg_gui_text_1: "X",
            var_jade_error_msg_gui_text_2: "X"
        });
    });
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
