var express = require('express');
var router = express.Router();
const sharp = require('sharp');

var User = require('../models/user');


var DEF_DEBUG = false;
var glob_user_obj;

router.get('/', ensureAuthenticated, function (req, res, next) {//https://luffy.ee.ncku.edu.tw:8787/get/?username=123.jpg

    var username = req.query.username.split(".")[0];//去掉.jpg
    var file_format = req.query.username.split(".")[1];//jpg
    if (DEF_DEBUG) console.log("username :" + username)
    if (DEF_DEBUG) console.log("file_format :" + file_format)

    User.getanotheruser(username, function (err, anotheruser) {
        if (anotheruser == null) {
            res.status(200).send("-1")
        }
        else {
        const profileimage_to_string = anotheruser.profileimage.toString()
        const base64_content = profileimage_to_string.replace(`data:image/${Image_Type(file_format)};base64,`,"")//'jpeg'陷阱
        const profileimg = new Buffer.from(base64_content, 'base64');
        const image = sharp(profileimg)
        image
            .metadata()
            .then(metadata => {
                const compress_ratio = set_compress_ratio(username)
                if (DEF_DEBUG) console.log("compress_ratio is :" + compress_ratio)
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


function ensureAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        glob_user_obj = req.user;
        return next();
    } else {
        console.error("@routes/profileimage.js Authenticated faild")
        res.redirect('/users/login');
    }
  }


function set_compress_ratio(query_without_jpg) {
    let compressratio;
    if (DEF_DEBUG) console.log("set_compress_ratio for :" + query_without_jpg)

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
    if (DEF_DEBUG) console.log("set_Content_Type for :" + output_file_format)

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

    if (DEF_DEBUG) console.log("set_Content_Type is :" + Content_Type)
    return Content_Type
}

function Image_Type(selected_file_format) {

    let Content_Type;
    if (DEF_DEBUG) console.log("Image_Type :" + selected_file_format)

    switch (selected_file_format) {
        case 'jpg':
            Content_Type = 'jpeg'
            break;
        case 'png':
            Content_Type = 'png'
            break;
        default:
            Content_Type = 'jpeg'
    }

    if (DEF_DEBUG) console.log("selected_file_format :" + Content_Type)
    return Content_Type
}

module.exports = router;
