var express = require('express');
var router = express.Router();

router.get('/sc1', ensureAuthenticated, function (req, res, next) {
    res.render('sc', { muti_page_index: '1', title: 'sc1' });
});
router.get('/sc2', ensureAuthenticated, function (req, res, next) {
    res.render('sc', { muti_page_index: '2', title: 'sc2' });
});
router.get('/sc3', ensureAuthenticated, function (req, res, next) {
    res.render('sc', { muti_page_index: '3', title: 'sc3' });
});


function ensureAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        //console.log("====================================");
        //console.log(req.user);
        return next();
    }
    res.redirect('/users/login');
}

module.exports = router;