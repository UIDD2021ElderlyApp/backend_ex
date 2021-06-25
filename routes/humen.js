var express = require('express');
var router = express.Router();
var multer = require('multer');
var upload = multer({ dest: './uploads' });
var empty = require('is-empty');

//import Data Model
var Human = require('../models/Human');

/* GET Humans listing. */
router.get('/', function (req, res, next) {
  res.send('respond with a resource');
});

//加入register routing
router.get('/register', function (req, res, next) {
  res.render('register', { title: 'Register' });
});

//POST request to register
router.post('/register', upload.single('profileimage'), function (req, res, next) {
  //using multer
  var name = req.body.name;
  var Humanname = req.body.Humanname;
  var profileimage = req.body.image;
  var animal = req.body.animal;
  var rank = req.body.rank;
  var gps = req.body.gps;

  console.log(name);
  console.log(Humanname);
  console.log(profileimage);
  console.log(animal);
  console.log(rank);
  console.log(gps);
  var error_msg_res = {};

  //Form Validator
  if (empty(name)) {
    error_msg_res["name"] = "empty";
  }
  if (empty(Humanname)) {
    error_msg_res["Humanname"] = "empty";
  }
  if (empty(rank)) {
    error_msg_res["rank"] = "empty";
  }
  if (empty(gps)) {
    error_msg_res["gps"] = "empty";
  }

  //console.log(req.file); //show uploaded image info.
  if (req.file) {
    console.log('Uploading File...');
    var profileimage = req.file.filename;
  } else {
    console.log('No File Uploaded...');
    var profileimage = 'noimage.jpg'; //use default image
    error_msg_res["profileimage"] = "empty";
  }

  console.log(error_msg_res);
  if (!empty(error_msg_res)) {
    //res.status(400).json(error_msg_res);
    res.render('register', {
      errors: error_msg_res
    });
  } else {
    //res.status(200).json(error_msg_res);
    var newHuman = new Human({
      name: name,
      Humanname: Humanname,
      profileimage: image,
      animal:　animal,
      rank: rank,
      gps: gps
    });

    Human.createHuman(newHuman, function (err, Human) {
      //track for error
      if (err) throw err;
      console.log(Human);
    });
    //Show success message with flash
    //req.flash('success', 'You are now registered and can login');
    res.location('/');
    res.redirect('/');
  }

});

router.post('/info', function (req, res, next) {
  var Humanget = Post.getHumanByHumanname(req.body.name);
  var info={}
  info["name"] = Humanget.name;
  info["animal"] = Humanget.animal;
  info["rank"] = Humanget.rank;
  info["gps"] = Humanget.gps;
  res.send(info);

});



module.exports = router;