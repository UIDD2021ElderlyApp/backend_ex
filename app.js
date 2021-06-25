/*
註：
這裡要用 npm start，不能像前面的project一樣用 node app.js
因為啟動server的code是存在bin\www檔案中，而非app.js
*/
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var bcrypt = require('bcryptjs');
//var flash        = require('req-flash');

//---
var bodyParser = require('body-parser');
//add new module
var session = require('express-session');
var passport = require('passport');
//var expressValidator = require('express-validator');
const { body, validationResult } = require('express-validator');
var LocalStrategy = require('passport-local').Strategy;
var multer = require('multer');
var upload = multer({ dest: './uploads' }); // setup multer upload destination
var flash = require('connect-flash');
var mongo = require('mongodb');
var mongoose = require('mongoose');
var randomstring = require("randomstring");
//create db connection using mongoose
var db = mongoose.connection;
//---

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var selectanimalOBJ = require('./routes/selectanimal');
//var reward_pure_txt_no_gui_OBJ = require('./routes/reward_pure_txt_no_gui');
//var tspoop = require('./routes/tspoop');
var mapview = require('./routes/mapview');
//var tshome = require('./routes/tshome');
//var tsfeed = require('./routes/tsfeed');
var timedoutdoorlock = require('./routes/timedoutdoorlock');
var facebooklogin_withpasspord_nogui = require('./routes/facebooklogin_withpasspord_nogui');
var pwa = require('./routes/pwa');
var ga = require('./routes/ga');
var image_api_test = require('./routes/image_api_test');
//var imggetapiRouter = require('./routes/imggetapi');
var imgRouter = require('./routes/imgs');
var main = require('./routes/main');

/*----------------------------------------------------*/
var socialRouter = require('./routes/social');
//var rewardRouter = require('./routes/reward');
//var missionRouter = require('./routes/mission');
//var keepRouter = require('./routes/keeps');
var poopRouter = require('./routes/poops');
var outdoorRouter = require('./routes/outdoor');
var medalRouter = require('./routes/medal')
var personalRouter = require('./routes/personal')
var peopleonmapRouter = require('./routes/PeopleOnMap')
var profileimageRouter = require('./routes/profileimage')
var posttmpRouter = require('./routes/posttmp')
/*----------------------------------------------------*/

var app = express();

//console.log(app.locals);

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
//app.use(flash());

//---
// Handle Sessions
app.use(session({
  secret: randomstring.generate(100),
  saveUninitialized: true,
  resave: true
}));
// Passport
app.use(passport.initialize());
app.use(passport.session());
// validator
/*app.use(legacy({
  errorFormatter: function(param, msg, value) {
      var namespace = param.split('.')
      , root    = namespace.shift()
      , formParam = root;

    while(namespace.length) {
      formParam += '[' + namespace.shift() + ']';
    }
    return {
      param : formParam,
      msg   : msg,
      value : value
    };
  }
}));*///驗證器
app.post(
  '/user',
  // username must be an email
  body('username').isEmail(),
  // password must be at least 5 chars long
  body('password').isLength({ min: 5 }),
  (req, res) => {
    // Finds the validation errors in this request and wraps them in an object with handy functions
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    User.create({
      username: req.body.username,
      password: req.body.password,
    }).then(user => res.json(user));
  },
  //https://github.com/express-validator/express-validator/issues/735
  //https://express-validator.github.io/docs/
);
// messages (express-messages / connect-flash)
app.use(require('connect-flash')());
app.use(function (req, res, next) {
  res.locals.messages = require('express-messages')(req, res);
  next();
});
//---

//set global variable for login/logout status
app.get('*', function (req, res, next) {
  //console.log("app.get(*, function(req, res, next){");
  console.log(req.user);
  res.locals.user = req.user || null;
  next();
});

app.get('/manifest.json', function (req, res, next) {
  res.status(200).json({
    "name": "Old friend",
    "short_name": "Old friend",
    "start_url": "https://luffy.ee.ncku.edu.tw:" + app.locals.port_https + "/main",
    "display": "standalone",
    "orientation": "portrait",
    "icons": [{
      "src": "./modular_folder/pwa/weblogo.png",
      "sizes": "374x374",
      "type": "image/png"
    }]
  });
});

// set up rate limiter: maximum of five requests per minute
var RateLimit = require('express-rate-limit');
var limiter = new RateLimit({
  windowMs: 1 * 60 * 1000, // 1 minute
  max: 60 * 1000//1000/1sec max
});
// apply rate limiter to all requests
app.use(limiter);

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/app/sel', selectanimalOBJ);
//app.use('/pure_txt_no_gui/reward', reward_pure_txt_no_gui_OBJ);
//app.use('/ts/poop', tspoop);
app.use('/ts/mapview', mapview);
//app.use('/ts/home', tshome);
//app.use('/ts/feed', tsfeed);
app.use('/timedoutdoorlock', timedoutdoorlock);
app.use('/auth', facebooklogin_withpasspord_nogui);
app.use('/pwa', pwa);
app.use('/ga', ga);
app.use('/image_api_test', image_api_test);
//app.use('/app/img', imggetapiRouter);
app.use('/app/img', imgRouter);
app.use('/main', main);

////////////////////////////////////////////////////

app.use('/app/social', socialRouter);
//app.use('/app/reward', rewardRouter);
//app.use('/app/mission', missionRouter);
//app.use('/app/keep', keepRouter);
app.use('/app/poop', poopRouter);
app.use('/app/outdoor', outdoorRouter);
//app.use('/app/dailymission', dailymissionRouter);//ReferenceError: dailymissionRouter is not defined//20210611被andyrhebreaker註解掉,cuz跑不動
app.use('/app/personal', personalRouter);
app.use('/app/PeopleOnMap', peopleonmapRouter);
app.use('/app/profileimage', profileimageRouter);
app.use('/app/posttmp', posttmpRouter);
app.use('/app/medal', medalRouter);
///////////////////////////////////////////////////////


// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;

/*ref
https://ithelp.ithome.com.tw/articles/10189263
*/
