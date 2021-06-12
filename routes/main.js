var express = require('express');
var router = express.Router();

var Person = require('../models/Personal');

router.get('/', ensureAuthenticated, function (req, res, next) {
    Person.getPersonal(req.user.username, function (err, Personget) {
        if (err) throw err;
        res.render('main', {
            title: 'old_friend',
            var_jade_user_info_name: `${req.user.name}`,
            var_jade_user_info_username: `${req.user.username}`,
            var_jade_user_info_profileimage: `${req.user.profileimage}`,
            var_jade_user_info_choosedanimal: `${(!Personget)?'-1':Personget.animal}`,
            var_use_old_jquery:true
        });
    });
});

function ensureAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        //console.log(req.user);
        return next();
    }
    res.redirect('/users/login');
}

module.exports = router;