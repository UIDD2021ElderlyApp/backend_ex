//Import password or private key file------------------------------------------------------------------
const fsModule = require('fs');

let rawdata = fsModule.readFileSync('Variouskeys/facebook_andyxu.json');
let student = JSON.parse(rawdata);
console.log(student);
//Import password or private key file------------------------------------------------------------------
var User = require('../models/user');

var passport = require('passport')
    , FacebookStrategy = require('passport-facebook').Strategy;

passport.use(new FacebookStrategy({
    clientID: student.account,
    clientSecret: student.password,
    callbackURL: "https://luffy.ee.ncku.edu.tw:38443/auth/facebook/callback",
    profileFields:
        ['id', 'name', 'displayName', 'gender', 'emails', 'photos', 'hometown', 'profileUrl', 'friends']
},
    function (accessToken, refreshToken, profile, done) {
        console.log(profile);
        console.log(profile._json.picture.data);

        var newUser = new User({
            name: profile.displayName || "empty!",
            email: (profile.emails) ? profile.emails[0].value || "empty!" : profile.provider || "empty!",
            username: profile.id || "empty!",
            password: "password" || "empty!",
            profileimage: (profile.photos) ? profile.photos[0].value || "empty!" : "empty!"
        });
        User.findOrCreate(newUser, function (err, user) {
            if (err) { return done(err); }
            return done(null, user);
        });
    }

));

passport.serializeUser(function (user, cb) {
    cb(null, user);
});

passport.deserializeUser(function (obj, cb) {
    cb(null, obj);
});

module.exports = passport;