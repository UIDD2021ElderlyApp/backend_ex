var express = require('express');
var router = express.Router();
var multer = require('multer');
const sharp = require('sharp');
var empty = require('is-empty');

var User = require('../models/user');


var DEF_DEBUG = true;
var glob_user_obj;

router.get('/', function (req, res, next) {//https://luffy.ee.ncku.edu.tw:8787/get/?username=123.jpg

    var username = req.query.username.split(".")[0];//去掉.jpg
    var file_format = req.query.username.split(".")[1];//jpg
    console.log("username :" + username)
    console.log("file_format :" + file_format)

    User.getanotheruser(username, function (err, anotheruser) {
        if (anotheruser == null) {
            res.status(200).send("-1")
        }
        else {
            res.status(200).send(anotheruser.profileimage)
        }
    })
});


/*以下是時代的產物
router.get('/', ensureAuthenticated, function (req, res, next) {
    if (DEF_DEBUG) {
        console.log("+++++++++");
        console.log("glob_user_obj.username :" + glob_user_obj.username);
    }

    if (glob_user_obj.profileimage == null) {
        res.status(200).send("-1")
    }
    else {
        const profileimg = new Buffer.from(glob_user_obj.profileimage, 'base64');
        const image = sharp(profileimg)
        image
            .metadata()
            .then(metadata => {
                const compress_ratio = set_compress_ratio(query_without_jpg)
                console.log("compress_ratio is :" + compress_ratio)
                return image
                    .resize({
                        width: Math.round(metadata.width * compress_ratio),
                        height: Math.round(metadata.height * compress_ratio)
                    })
                    .toBuffer();
            })
            .then(data => {
                //res.set({ 'Content-Type': `image/${set_Content_Type(file_format)}` })//有問題
                res.type(`${set_Content_Type(file_format)}`)
                res.status(200)
                res.send(data)
            })
            .catch(err => { throw err });
    }
    //res.status(200).res.sendfile(profileimg);//undefined??
});

router.get('/anotheruser', function (req, res, next) {//https://luffy.ee.ncku.edu.tw:8787/get/?username=123.jpg

    var query_without_jpg = req.query.username.split(".")[0];//去掉.jpg
    var file_format = req.query.username.split(".")[1];//jpg
    query_without_jpg = query_without_jpg.split("_");//['abc123', 'tb', 'b']
    console.log("query_without_jpg :" + query_without_jpg)
    console.log("file_format :" + file_format)
    var username = query_without_jpg[0]//'abc123'

    User.getanotheruser(username, function (err, anotheruser) {
        if (anotheruser == null) {
            res.status(200).send("-1")
        }
        else {
            const profileimg = new Buffer.from(anotheruser.profileimage, 'base64');
            const image = sharp(profileimg)
            image
                .metadata()
                .then(metadata => {
                    const compress_ratio = set_compress_ratio(query_without_jpg)
                    console.log("compress_ratio is :" + compress_ratio)
                    return image
                        .resize({
                            width: Math.round(metadata.width * compress_ratio),
                            height: Math.round(metadata.height * compress_ratio)
                        })
                        .toBuffer();
                })
                .then(data => {
                    //res.set({ 'Content-Type': `image/${set_Content_Type(file_format)}` })//有問題
                    res.type(`${set_Content_Type(file_format)}`)
                    res.status(200)
                    res.send(data)
                })
                .catch(err => { throw err });
        }
    })
});
*/


function ensureAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        glob_user_obj = req.user;
        return next();
    }
    res.redirect('/users/login');
}
/*以下是時代的產物
function set_compress_ratio(query_without_jpg) {
    let compressratio;
    console.log("set_compress_ratio for :" + query_without_jpg)

    if (query_without_jpg[1] === undefined)
        compressratio = 1
    else
        switch (query_without_jpg[2]) {
            case 'b':
                compressratio = 0.96
                break;
            case 'z':
                compressratio = 0.8
                break;
            case 'n':
                compressratio = 0.48
                break;
            case 'm':
                compressratio = 0.32
                break;
            case 't':
                compressratio = 0.16
                break;
            default:
                compressratio = 0.64
        }

    return compressratio
}

function set_Content_Type(output_file_format) {

    let Content_Type;
    console.log("set_Content_Type for :" + output_file_format)

    switch (output_file_format) {
        case 'jpg':
            Content_Type = 'jpg'
            break;
        case 'png':
            Content_Type = 'png'
            break;
        default:
            Content_Type = 'jpg'
    }

    console.log("set_Content_Type is :" + Content_Type)
    return Content_Type
}
*/
module.exports = router;
