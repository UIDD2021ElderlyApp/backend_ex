var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', ensureAuthenticated, function (req, res, next) {
  res.redirect('/users/login');//強迫連結登入
  //console.log("router.get(__/__, ensureAuthenticated, function(req, res, next) {");
  res.render('index', { title: 'Members' });
  //res.status(200).json({"exampleKey":"exampleValue"});
});

function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
      return next();
  } else {
      console.error("@routes/index.js Authenticated faild")
      res.redirect('/users/login');
  }
}

module.exports = router;