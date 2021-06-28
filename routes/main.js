var express = require('express');
var router = express.Router();

var Person = require('../models/Personal'); var PostTmp = require('../models/PostTmp');

router.get('/', ensureAuthenticated, function (req, res, next) {
    Person.getPersonal(req.user.username, function (err, Personget) {
        if (err) throw err;
        PostTmp.getPostTmp(req.user.username, function (err2, PostTmpget) {
            if (err2) throw err2;
            console.log("------------------------------------------------>>>>>>>>>>>>>>>" + PostTmpget);
            res.render('main', {
                title: 'old_friend',
                var_jade_user_info_name: `${req.user.name}`,
                var_jade_user_info_username: `${req.user.username}`,
                var_jade_user_info_profileimage: `${req.user.profileimage}`,
                var_jade_user_info_choosedanimal: `${(!Personget) ? '-1' : Personget.animal}`,
                var_use_old_jquery: true,
                var_app_PostTmp_get_pooptmmp: `${PostTmpget.post_tmp}`,
                var_app_PostTmp_get_poop_img_sel_tmmp: `${PostTmpget.post_img_select_tmp}`,
                var_jade_err_msg_show: false,
                var_jade_error_msg_gui_text_1: "X",
                var_jade_error_msg_gui_text_2: "X"
            });
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