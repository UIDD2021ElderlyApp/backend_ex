//Import password or private key file------------------------------------------------------------------
const fsModule = require('fs');

let rawdata = fsModule.readFileSync('Variouskeys/facebook_andyxu.json');
let student = JSON.parse(rawdata);
console.log(student);
//Import password or private key file------------------------------------------------------------------

var passport = require('passport')
    , FacebookStrategy = require('passport-facebook').Strategy;

passport.use(new FacebookStrategy({
    clientID: student.account,
    clientSecret: student.password,
    callbackURL: "https://luffy.ee.ncku.edu.tw:38443/auth/facebook/callback"
},
    function (accessToken, refreshToken, profile, done) {
        return done(null, profile);
    }
));

passport.serializeUser(function (user, cb) {
    cb(null, user);
});

passport.deserializeUser(function (obj, cb) {
    cb(null, obj);
});

module.exports = passport;