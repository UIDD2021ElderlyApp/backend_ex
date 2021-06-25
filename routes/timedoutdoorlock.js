var express = require('express');
var router = express.Router();

router.post('/verifythefirstnumber', function (req, res, next) {
    //Show success message with flash
    req.flash('successes', 'You are now registered and can login');
    res.redirect('/users/login');
    res.status(200);
});

module.exports = router;