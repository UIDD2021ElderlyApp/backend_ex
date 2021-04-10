var express = require('express');
var router = express.Router();

router.post('/', ensureAuthenticated, function (req, res, next) {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.write(JSON.stringify([{ message: "Hello World" }, { examplekey: "answer" }]));
    res.end();
});

function ensureAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect('/users/login');
}

module.exports = router;