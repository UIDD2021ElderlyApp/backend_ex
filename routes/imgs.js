var express = require('express');
var router = express.Router();
var multer = require('multer');
const storage = multer.memoryStorage();
var upload = multer({ storage: storage, limits: { /*fields: 1, */fileSize: 6000000, files: 1/*, parts: 2 */ } });
var empty = require('is-empty');

var Img = require('../models/img');
const sharp = require('sharp');

var DEF_DEBUG = false;
var glob_user_obj;
var default_img_numbers = 6;

router.get('/', ensureAuthenticated, function (req, res, next) {

    var query_without_jpg = req.query.title.split(".")[0];//去掉.jpg
    var file_format = req.query.title.split(".")[1];//jpg
    query_without_jpg = query_without_jpg.split("_");//['abc123', 'tb', 'b']
    if (DEF_DEBUG) console.log("query_without_jpg :" + query_without_jpg);
    if (DEF_DEBUG) console.log("file_format :" + file_format);
    var title = query_without_jpg[0] + "." + file_format;//'abc123.jpg'

    Img.getImgByImgtitle(title, function (err, Imgget) {
        if (Imgget == null) {
            res.status(200).send("-1");
        }
        else {
            if (DEF_DEBUG) console.log(`image/${set_Content_Type(file_format)}`);
            if (DEF_DEBUG) console.log("Imgget :" + Imgget._id);
            const img = new Buffer.from(Imgget.content, 'base64');
            const image = sharp(img);
            image
                .metadata()
                .then(metadata => {
                    const compress_ratio = set_compress_ratio(query_without_jpg);
                    if (DEF_DEBUG) console.log("compress_ratio is :" + compress_ratio);
                    return image
                        .resize({
                            width: Math.round(metadata.width * compress_ratio),
                            height: Math.round(metadata.height * compress_ratio)
                        })
                        .toBuffer();
                })
                .then(data => {
                    //res.set({ 'Content-Type': `image/${set_Content_Type(file_format)}` })//有問題
                    res.type(`${set_Content_Type(file_format)}`);
                    res.status(200);
                    res.send(data);
                })
                .catch(err => { throw err; });
        }

    });

});

router.get('/gallery', ensureAuthenticated, function (req, res, next) {
    console.log("router.get('/gallery', ensureAuthenticated, function (req, res, next) {    ");

    var user_name = glob_user_obj.username;
    var imgtitlearray = []
    Img.getMultiImgByUsername(user_name, function (err, Imgsget) {
        console.log("t1");
        Imgsget.forEach(Imgget => {
            if (err) throw err;

            if (DEF_DEBUG) console.log("+++++++++-----------");
            if (DEF_DEBUG) console.log(Imgget.title);
            console.log("t2");
            imgtitlearray.unshift(Imgget.title)
        });
        console.log("t3");
        for (let i = 0; i < default_img_numbers; i++) {
            imgtitlearray.push(`DefaultImgNo${i}.jpg`)
        }
        res.status(200).send(imgtitlearray);
        console.log("t4");
    });

});

router.post('/', ensureAuthenticated, upload.single('img'), function (req, res, next) {

    var content = req.file.buffer.toString('base64');

    console.log(`||||||
|
|
|----------------------------------
`); console.log(content);
    if (DEF_DEBUG) console.log("+++++++++");
    if (DEF_DEBUG) console.log("glob_user_obj.username :" + glob_user_obj.username);

    var user_name = glob_user_obj.username;
    var title = glob_user_obj.username.toString() + Date.now().toString() + ".jpg";

    var error_msg_res = {};
    if (empty(content)) {
        error_msg_res["content"] = "empty";
    }


    if (DEF_DEBUG) console.log("+++++++++");
    if (DEF_DEBUG) console.log(/*time*/Date.now().toString());
    if (DEF_DEBUG) console.log(user_name);
    if (DEF_DEBUG) console.log(title);

    if (DEF_DEBUG) console.log(error_msg_res);


    if (!empty(error_msg_res)) {
        res.status(406).send(error_msg_res);
    } else {
        var newImg = new Img({
            time: Date.now().toString(),
            user_name: user_name,
            title: title,
            content: content
        });
        Img.createImg(newImg, function (err, newImg) {
            if (err) throw err;
            if (DEF_DEBUG) console.log(newImg);
            var id = {};
            id["img_title"] = title;
            res.status(200).send(JSON.stringify(id));
        });
    }
});


function ensureAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        glob_user_obj = req.user;
        return next();
    } else {
        console.error("@routes/imgs.js Authenticated faild")
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

module.exports = router;

