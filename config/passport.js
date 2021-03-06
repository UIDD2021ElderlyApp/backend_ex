//Import password or private key file------------------------------------------------------------------
const fsModule = require('fs');
var request = require('request').defaults({ encoding: null });
var DEF_default_img = "/frontend/biggggg/image/test.svg"

var DEF_debug = true;

let rawdata = fsModule.readFileSync('./Variouskeys/facebook_andyxu.json');
let student = JSON.parse(rawdata);
if (DEF_debug) console.log(student);

let tmp_port = fsModule.readFileSync('./Variouskeys/.tmp_port.json');
let tmp_port_json = JSON.parse(tmp_port);
if (DEF_debug) console.log(tmp_port_json.port_https);

//Import password or private key file------------------------------------------------------------------
var User = require('../models/user');

var passport = require('passport')
    , FacebookStrategy = require('passport-facebook').Strategy;

passport.use(new FacebookStrategy({
    clientID: student.account,
    clientSecret: student.password,
    callbackURL: "https://luffy.ee.ncku.edu.tw:" + tmp_port_json.port_https + "/auth/facebook/callback",
    profileFields:
        ['id', 'name', 'displayName', 'gender', 'emails', 'photos', 'hometown', 'profileUrl', 'friends']
},
    function (accessToken, refreshToken, profile, done) {
        if (DEF_debug) console.log(profile);
        if (DEF_debug) console.log(profile._json.picture.data);
        var url_to_download_profileimage = (profile.photos) ? profile.photos[0].value || "https://luffy.ee.ncku.edu.tw:" + tmp_port_json.port_https + DEF_default_img : "https://luffy.ee.ncku.edu.tw:" + tmp_port_json.port_https + DEF_default_img;
        request.get(url_to_download_profileimage, function (error, response, body) {
            if (error) {
                console.error(error);
            }
            if (!error && response.statusCode == 200) {
                data = "data:" + response.headers["content-type"] + ";base64," + Buffer.from(body).toString('base64');
                //if (DEF_debug) console.log(data);
                var newUser = new User({
                    name: profile.displayName || "empty!",
                    email: (profile.emails) ? profile.emails[0].value || "empty!" : profile.provider || "empty!",
                    username: profile.id || "empty!",
                    password: "password" || "empty!",
                    profileimage: data
                });
                User.findOrCreate(newUser, function (err, user) {
                    if (err) { return done(err); }
                    return done(null, user);
                });
            }
        });
    }
));

//line login------------------------------------------------------------------------------------------
var sharp = require('sharp')

let rawdata_line = fsModule.readFileSync('./Variouskeys/line_Ery-z.json');
let student_line = JSON.parse(rawdata_line);
if (DEF_debug) console.log(student_line);

const LineStrategy = require('passport-line-auth').Strategy;
const jwt = require('jsonwebtoken');

passport.use(new LineStrategy({
    channelID: student_line.client_id,
    channelSecret: student_line.secret,
    callbackURL: "https://luffy.ee.ncku.edu.tw:" + tmp_port_json.port_https + "/auth/line/callback",
    scope: ['profile', 'openid', 'email'],
    botPrompt: 'normal'
},
    function (accessToken, refreshToken, params, profile, cb) {
        const { email } = jwt.decode(params.id_token);
        profile.email = email;
        if (DEF_debug) console.log(profile);
        var url_to_download_profileimage = (profile.pictureUrl) ? profile.pictureUrl || "https://luffy.ee.ncku.edu.tw:" + tmp_port_json.port_https + DEF_default_img : "https://luffy.ee.ncku.edu.tw:" + tmp_port_json.port_https + DEF_default_img;
        request.get(url_to_download_profileimage, function (error, response, body) {
            if (error) {
                console.error(error);
            }
            if (!error && response.statusCode == 200) {

                const img = Buffer.from(body);
                const image = sharp(img);
                image
                  .metadata()
                  .then(metadata => {
                    return image
                      .resize({
                        width: 200,
                        height: 200,
                        fit: sharp.fit.cover,
                      })
                      .toBuffer();
                  })
                  .then(data => {
                    profileimage = "data:image/jpeg;base64," + data.toString('base64');

                    var newUser = new User({
                        name: profile.displayName || "empty!",
                        email: (profile.email) ? profile.email || "empty!" : profile.provider || "empty!",
                        username: profile.id || "empty!",
                        password: "password" || "empty!",
                        profileimage: profileimage
                    });
                    User.findOrCreate(newUser, function (err, user) {
                        if (err) { return done(err); }
                        return cb(null, user);
                    });

                  })
                  .catch(err => { throw err; });

            }
        });
    })
);

passport.serializeUser(function (user, cb) {
    cb(null, user);
});

passport.deserializeUser(function (obj, cb) {
    cb(null, obj);
});

module.exports = passport;