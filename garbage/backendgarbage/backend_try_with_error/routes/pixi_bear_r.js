var express = require('express');
var router = express.Router();

router.get('/pixi_bear2',  function (req, res, next) {
    res.render('pixi_bear2', { title: 'pixi_bear2' });
  });

  module.exports = router;