var express = require('express');
var router = express.Router();

router.get('/', ensureAuthenticated, function (req, res, next) {
    console.log("opened a page (with out auth.)");
    res.render('pixi_test_html', { title: 'pixi_test_page' });
});

router.get('/scss_test', ensureAuthenticated, function (req, res, next) {
    console.log("opened a page (with out auth.)");
    res.render('scss_test_page', { title: 'scss_test_page' });
});

function ensureAuthenticated(req, res, next) {
    /*by pass login*/
    //if (req.isAuthenticated()) {
    return next();
    // }
    //res.redirect('/users/login');
}

module.exports = router;