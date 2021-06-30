var express = require('express');
var router = express.Router();

router.get('/', ensureAuthenticated, function (req, res, next) {
    //console.log("router.post(__/selectanimal__, ensureAuthenticated, function(req, res, next) {");
    //res.status(200).json({ "exampleKey": "exampleValue" });
    res.render('appsel', { title: 'appsel' });
});

function ensureAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    } else {
        console.error("@routes/selectanimal.js Authenticated faild")
        res.redirect('/users/login');
    }
}

module.exports = router;