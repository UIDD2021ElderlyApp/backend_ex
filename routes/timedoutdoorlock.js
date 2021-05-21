var express = require('express');
var router = express.Router();

router.post('/verifythefirstnumber', function (req, res, next) {
    //res.render('appsel', { title: 'appsel' });
    //Show success message with flash
    req.flash('successes', 'You are now registered and can login');
    //res.location('/users/login');
    res.redirect('/users/login');
    res.status(200);
});

module.exports = router;