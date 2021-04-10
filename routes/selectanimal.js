var express = require('express');
var router = express.Router();

router.post('/', ensureAuthenticated, function (req, res, next) {
    //console.log("router.post(__/selectanimal__, ensureAuthenticated, function(req, res, next) {");
    res.status(200).json({ "exampleKey": "exampleValue" });
});

router.get('/pixi', ensureAuthenticated, function (req, res, next) {
    console.log("=====================");
  res.render('pixi_test_html', { title: 'pixi_test_page' });
});

function ensureAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect('/users/login');
}

module.exports = router;