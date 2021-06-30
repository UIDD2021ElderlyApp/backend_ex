var express = require('express');
var router = express.Router();

router.get('/', ensureAuthenticated, function (req, res, next) {
    res.render('mapview', { title: 'mapview' });
});

function ensureAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    } else {
        console.error("@mapview.js Authenticated faild")
        res.redirect('/users/login');
    }
}

module.exports = router;