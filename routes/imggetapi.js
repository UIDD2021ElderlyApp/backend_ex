var express = require('express');
var router = express.Router();

var Img = require('../models/img');
const sharp = require('sharp');

var DEF_DEBUG = false;

router.get('/', function (req, res, next) {

    var query_without_jpg = req.query.title.split(".")[0];//去掉.jpg
    var file_format = req.query.title.split(".")[1];//jpg
    query_without_jpg = query_without_jpg.split("_");//['abc123', 'tb', 'b']
    if (DEF_DEBUG) console.log("query_without_jpg :" + query_without_jpg);
    if (DEF_DEBUG) console.log("file_format :" + file_format);
    var title = query_without_jpg[0] + "." + file_format;//'abc123.jpg'

    Img.getImgByImgtitle(title, function (err, Imgget) {
        if (err || Imgget == null) {
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
                    res.type(`${set_Content_Type(file_format)}`);
                    res.status(200);
                    res.send(data);
                })
                .catch(err => { throw err; });
        }

    });

});

module.exports = router;
