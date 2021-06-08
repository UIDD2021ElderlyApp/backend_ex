var express = require('express');
var router = express.Router();

router.get('/sc3', ensureAuthenticated, function (req, res, next) {
    res.render('sc1', { title: 'sc1' });
});
router.get('/sc2', ensureAuthenticated, function (req, res, next) {
    res.render('sc2', { block:'content_body',title: 'sc2' });
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