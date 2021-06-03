var express = require('express');
var router = express.Router();

router.get('/manifest.json', ensureAuthenticated, function (req, res, next) {
    res.status(200).json({
        "name": "Old friend",
        "short_name": "Old friend",
        "start_url": "https://luffy.ee.ncku.edu.tw:38443/ts/home",
        "display": "standalone",
        "orientation": "portrait",
        "icons": [{
          "src": "./weblogo.png",
          "sizes": "374x374",
          "type": "image/png"
        }]
      });
});

function ensureAuthenticated(req, res, next) {
    return next();
}

module.exports = router;