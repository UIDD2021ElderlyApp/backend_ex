var express = require('express');
var router = express.Router();

router.get('/', ensureAuthenticated, function (req, res, next) {
    res.render('reward_pure_txt_no_gui', { title: 'reward_pure_txt_no_gui' });
});

function ensureAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect('/users/login');
}

module.exports = router;