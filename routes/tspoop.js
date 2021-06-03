var express = require('express');
var router = express.Router();

router.get('/', ensureAuthenticated, function (req, res, next) {
    res.render('tspoop', { title: 'tspoop' });
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