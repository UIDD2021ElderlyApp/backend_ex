var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var bcrypt = require('bcryptjs');

var bodyParser = require('body-parser');
var session = require('express-session');
var passport = require('passport');
const { body, validationResult } = require('express-validator');
var LocalStrategy = require('passport-local').Strategy;
var multer = require('multer');
var upload = multer({ dest: './uploads' });
var flash = require('connect-flash');
var mongo = require('mongodb');
var mongoose = require('mongoose');
var randomstring = require("randomstring");
var db = mongoose.connection;

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var selectanimalOBJ = require('./routes/selectanimal');
var mapview = require('./routes/mapview');
var timedoutdoorlock = require('./routes/timedoutdoorlock');
var facebooklogin_withpasspord_nogui = require('./routes/facebooklogin_withpasspord_nogui');
var pwa = require('./routes/pwa');
var ga = require('./routes/ga');
var imgRouter = require('./routes/imgs');
var main = require('./routes/main');
var poopRouter = require('./routes/poops');
var medalRouter = require('./routes/medal')
var personalRouter = require('./routes/personal')
var peopleonmapRouter = require('./routes/PeopleOnMap')
var profileimageRouter = require('./routes/profileimage')
var posttmpRouter = require('./routes/posttmp')
var middatatmpRouter = require('./routes/middatatmp')

var app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(flash());

app.use(session({
    secret: randomstring.generate(100),
    saveUninitialized: false,
    resave: true
}));
app.use(passport.initialize());
app.use(passport.session());

app.post(
    '/user',
    body('username').isEmail(),
    body('password').isLength({ min: 5 }),
    (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        User.create({
            username: req.body.username,
            password: req.body.password,
        }).then(user => res.json(user));
    },
);

app.use(function(req, res, next) {
    res.locals.messages = require('express-messages')(req, res);
    next();
});

app.get('*', function(req, res, next) {
    console.log((!req.user)?"[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[nouser]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]":req.user);
    res.locals.user = req.user || null;
    next();
});

app.get('/manifest.json', function(req, res, next) {
    res.status(200).json({
        "name": "Old friends",
        "short_name": "Old friends",
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


var RateLimit = require('express-rate-limit');
var limiter = new RateLimit({
    windowMs: 1 * 60 * 1000, // 1 minute
    max: 60 * 1000 * 1000 //1000*1000/1sec max
});

app.use(limiter);

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/app/sel', selectanimalOBJ);
app.use('/ts/mapview', mapview);
app.use('/timedoutdoorlock', timedoutdoorlock);
app.use('/auth', facebooklogin_withpasspord_nogui);
app.use('/pwa', pwa);
app.use('/ga', ga);
app.use('/app/img', imgRouter);
app.use('/main', main);
app.use('/app/poop', poopRouter);
app.use('/app/personal', personalRouter);
app.use('/app/PeopleOnMap', peopleonmapRouter);
app.use('/app/profileimage', profileimageRouter);
app.use('/app/posttmp', posttmpRouter);
app.use('/app/medal', medalRouter);
app.use('/app/mid_data_tmp', middatatmpRouter)


app.use(function(req, res, next) {
    next(createError(404));
});
app.use(function(err, req, res, next) {
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};
    res.status(err.status || 500);
    res.render('error');
});

module.exports = app;
